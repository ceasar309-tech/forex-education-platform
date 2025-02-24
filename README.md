# Forex Education Platform

A comprehensive online platform for learning Forex trading, built with React, Node.js, and Material-UI.

## Features

- 📚 Expert-led Forex trading courses
- 📊 Real-time market analysis
- 👥 User authentication and profiles
- 💳 Subscription management
- 📱 Responsive design
- 🔒 Secure API endpoints

## Tech Stack

### Frontend
- React
- TypeScript
- Material-UI
- React Router
- Axios
- React Helmet (SEO)

### Backend
- Node.js
- Express
- Sequelize ORM
- JWT Authentication
- SQLite (Development)
- PostgreSQL (Production)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/forex-education-platform.git
cd forex-education-platform
```

2. Install backend dependencies
```bash
npm install
```

3. Install frontend dependencies
```bash
cd client
npm install
```

4. Create environment variables
```bash
# Backend (.env)
PORT=5001
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5001/api
```

5. Start the development servers
```bash
# Backend
npm run dev

# Frontend (in a new terminal)
cd client
npm start
```

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### Backend (Railway)
1. Push code to GitHub
2. Connect repository to Railway
3. Configure environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
