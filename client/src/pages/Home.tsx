import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
} from '@mui/material';
import SEO from '../components/SEO';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with years of trading experience.',
    },
    {
      title: 'Real-Time Analysis',
      description: 'Access up-to-date market analysis and trading opportunities.',
    },
    {
      title: 'Community Support',
      description: 'Join a community of traders and share experiences.',
    },
  ];

  return (
    <>
      <SEO
        title="Learn Forex Trading"
        description="Master Forex trading with our comprehensive education platform. Get access to expert-led courses, real-time market analysis, and a supportive trading community."
        keywords="forex trading, forex education, trading courses, market analysis, trading community"
      />
      
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  mb: 4,
                }}
              >
                Master Forex Trading
              </Typography>
              <Typography variant="h5" paragraph>
                Learn to trade with confidence using our comprehensive education platform
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/register')}
                sx={{ mt: 2 }}
              >
                Start Learning Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src="/trading-hero.jpg"
                alt="Forex Trading Dashboard"
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: theme.shape.borderRadius,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Start Your Trading Journey?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Join thousands of successful traders who have learned with us
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
