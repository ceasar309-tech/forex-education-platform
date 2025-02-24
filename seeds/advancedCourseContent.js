const beginnerCourses = [
    {
        title: "Forex Trading Fundamentals",
        description: "Learn the basics of forex trading, including currency pairs, pips, and basic market analysis.",
        type: "forex",
        level: "beginner",
        modules: [
            {
                title: "Introduction to Forex",
                content: "Understanding currency pairs and forex market basics",
                videoUrl: "https://example.com/videos/intro-forex",
                quizzes: [
                    {
                        question: "What is a pip in forex trading?",
                        options: ["The smallest price move", "A trading platform", "A type of currency", "A trading strategy"],
                        correctAnswer: 0
                    }
                ]
            }
        ],
        duration: "2 weeks"
    }
];

const advancedForexCourses = [
    {
        title: "Advanced Forex Trading Strategies",
        description: "Master advanced forex trading techniques including swing trading and position trading.",
        type: "forex",
        level: "pro",
        modules: [
            {
                title: "Advanced Technical Analysis",
                content: "Learn advanced chart patterns and indicators",
                videoUrl: "https://example.com/videos/advanced-ta",
                quizzes: [
                    {
                        question: "Which pattern indicates a potential trend reversal?",
                        options: ["Head and Shoulders", "Moving Average", "Volume", "RSI"],
                        correctAnswer: 0
                    }
                ]
            },
            {
                title: "Risk Management Mastery",
                content: "Advanced risk management techniques for professional traders",
                videoUrl: "https://example.com/videos/risk-management",
                quizzes: [
                    {
                        question: "What is the recommended risk per trade?",
                        options: ["1-2%", "5-10%", "15-20%", "25-30%"],
                        correctAnswer: 0
                    }
                ]
            }
        ],
        duration: "4 weeks"
    },
    {
        title: "Institutional Trading Methods",
        description: "Learn how institutional traders analyze and trade the forex market.",
        type: "forex",
        level: "pro",
        modules: [
            {
                title: "Order Flow Analysis",
                content: "Understanding institutional order flow and market making",
                videoUrl: "https://example.com/videos/order-flow",
                quizzes: [
                    {
                        question: "What indicates strong institutional buying?",
                        options: ["Large buy orders at key levels", "Small retail orders", "Random price movements", "News headlines"],
                        correctAnswer: 0
                    }
                ]
            }
        ],
        duration: "3 weeks"
    }
];

const advancedDerivCourses = [
    {
        title: "Binary Options Mastery",
        description: "Advanced strategies for successful binary options trading.",
        type: "deriv",
        level: "pro",
        modules: [
            {
                title: "Price Action Trading",
                content: "Master price action techniques for binary options",
                videoUrl: "https://example.com/videos/price-action",
                quizzes: [
                    {
                        question: "What is the best timeframe for price action analysis?",
                        options: ["H1 and H4", "M1", "Daily", "Weekly"],
                        correctAnswer: 0
                    }
                ]
            },
            {
                title: "Advanced Entry Techniques",
                content: "Learn precise entry methods for higher probability trades",
                videoUrl: "https://example.com/videos/entry-techniques",
                quizzes: [
                    {
                        question: "Which indicator works best with price action?",
                        options: ["Support/Resistance", "Moving Averages", "RSI", "All of the above"],
                        correctAnswer: 3
                    }
                ]
            }
        ],
        duration: "3 weeks"
    },
    {
        title: "Digital Options Strategy",
        description: "Comprehensive guide to trading digital options on Deriv platform.",
        type: "deriv",
        level: "intermediate",
        modules: [
            {
                title: "Platform Mastery",
                content: "Advanced features of the Deriv trading platform",
                videoUrl: "https://example.com/videos/deriv-platform",
                quizzes: [
                    {
                        question: "What is the minimum trade duration?",
                        options: ["1 second", "1 minute", "5 minutes", "15 minutes"],
                        correctAnswer: 0
                    }
                ]
            }
        ],
        duration: "2 weeks"
    }
];

module.exports = {
    beginnerCourses,
    advancedForexCourses,
    advancedDerivCourses
};
