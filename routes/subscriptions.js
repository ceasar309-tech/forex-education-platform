const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// Create subscription
router.post('/create', protect, async (req, res) => {
    try {
        const { paymentMethodId, priceId } = req.body;

        // Get user
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create or get Stripe customer
        let customerId = user.stripeCustomerId;
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                payment_method: paymentMethodId,
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });
            customerId = customer.id;
            user.stripeCustomerId = customerId;
            await user.save();
        }

        // Create subscription
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            expand: ['latest_invoice.payment_intent'],
        });

        // Update user subscription status
        user.subscriptionStatus = 'premium';
        user.accountStatus = 'active';
        await user.save();

        res.json({
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating subscription', error: err.message });
    }
});

// Cancel subscription
router.post('/cancel', protect, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user || !user.stripeCustomerId) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        // Get Stripe subscriptions
        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripeCustomerId,
            status: 'active',
            limit: 1,
        });

        if (subscriptions.data.length === 0) {
            return res.status(404).json({ message: 'No active subscription found' });
        }

        // Cancel subscription at period end
        await stripe.subscriptions.update(subscriptions.data[0].id, {
            cancel_at_period_end: true,
        });

        // Update user status (will be changed to 'expired' when subscription actually ends)
        user.subscriptionStatus = 'canceling';
        await user.save();

        res.json({ message: 'Subscription will be canceled at the end of the billing period' });
    } catch (err) {
        res.status(500).json({ message: 'Error canceling subscription', error: err.message });
    }
});

// Get subscription status
router.get('/status', protect, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.stripeCustomerId) {
            return res.json({
                status: user.subscriptionStatus,
                trialEnds: user.trialEnds
            });
        }

        // Get subscription from Stripe
        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripeCustomerId,
            status: 'active',
            limit: 1,
        });

        const subscription = subscriptions.data[0];
        
        res.json({
            status: user.subscriptionStatus,
            trialEnds: user.trialEnds,
            subscription: subscription ? {
                id: subscription.id,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                cancelAtPeriodEnd: subscription.cancel_at_period_end
            } : null
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching subscription status', error: err.message });
    }
});

// Webhook handler for Stripe events
router.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).json({ message: `Webhook Error: ${err.message}` });
    }

    // Handle the event
    switch (event.type) {
        case 'customer.subscription.deleted':
        case 'customer.subscription.updated': {
            const subscription = event.data.object;
            const user = await User.findOne({
                where: { stripeCustomerId: subscription.customer }
            });

            if (user) {
                if (subscription.status === 'active') {
                    user.subscriptionStatus = 'premium';
                } else if (subscription.status === 'canceled') {
                    user.subscriptionStatus = 'expired';
                }
                await user.save();
            }
            break;
        }
        case 'invoice.payment_failed': {
            const invoice = event.data.object;
            const user = await User.findOne({
                where: { stripeCustomerId: invoice.customer }
            });

            if (user) {
                user.subscriptionStatus = 'payment_failed';
                await user.save();
            }
            break;
        }
    }

    res.json({ received: true });
});

module.exports = router;
