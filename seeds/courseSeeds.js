const forexCourses = [
    {
        title: "Forex Fundamentals",
        type: "forex",
        level: "beginner",
        description: "Learn the basics of forex trading",
        modules: [
            {
                title: "What is Forex Trading?",
                content: "Introduction to currency pairs, market hours, and basic terminology",
                videoUrl: "/videos/forex-intro",
                quizzes: [
                    {
                        question: "What is a currency pair?",
                        options: [
                            "Two currencies being traded against each other",
                            "A pair of similar currencies",
                            "The same currency listed twice",
                            "A currency conversion rate"
                        ],
                        correctAnswer: 0
                    }
                ]
            },
            {
                title: "Basic Chart Analysis",
                content: "Understanding price charts, timeframes, and basic patterns",
                videoUrl: "/videos/chart-analysis",
                quizzes: []
            }
        ]
    },
    {
        title: "Advanced Forex Strategies",
        type: "forex",
        level: "intermediate",
        description: "Master technical analysis and trading strategies",
        modules: [
            {
                title: "Technical Indicators",
                content: "Understanding and using various technical indicators",
                videoUrl: "/videos/technical-indicators",
                quizzes: []
            },
            {
                title: "Risk Management",
                content: "Learn proper risk management techniques",
                videoUrl: "/videos/risk-management",
                quizzes: []
            }
        ]
    }
];

const derivCourses = [
    {
        title: "Introduction to Deriv Trading",
        type: "deriv",
        level: "beginner",
        description: "Learn the basics of derivative trading",
        modules: [
            {
                title: "What are Derivatives?",
                content: "Understanding financial derivatives and their types",
                videoUrl: "/videos/deriv-intro",
                quizzes: []
            },
            {
                title: "Options Basics",
                content: "Introduction to options trading",
                videoUrl: "/videos/options-basics",
                quizzes: []
            }
        ]
    },
    {
        title: "Advanced Deriv Trading",
        type: "deriv",
        level: "pro",
        description: "Master complex derivative trading strategies",
        modules: [
            {
                title: "Options Strategies",
                content: "Advanced options trading strategies",
                videoUrl: "/videos/advanced-options",
                quizzes: []
            },
            {
                title: "Risk Analysis",
                content: "Complex risk analysis and management",
                videoUrl: "/videos/risk-analysis",
                quizzes: []
            }
        ]
    }
];

module.exports = {
    forexCourses,
    derivCourses
};
