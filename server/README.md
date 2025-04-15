
# Fitness App Backend

This is the backend server for the Fitness App. It provides API endpoints for managing sessions, users, and authentication.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running on localhost:27017

## Setup and Installation

1. Navigate to the server directory:
```
cd server
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the server directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-app
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the server:
```
npm run dev
```

The server will start on http://localhost:5000

## API Endpoints

### Sessions
- GET `/api/sessions` - Get all sessions
- GET `/api/sessions/user/:userId` - Get user's sessions
- GET `/api/sessions/upcoming/:userId` - Get upcoming sessions
- GET `/api/sessions/past/:userId` - Get past sessions
- POST `/api/sessions` - Create a new session
- PUT `/api/sessions/:id` - Update a session
- DELETE `/api/sessions/:id` - Delete a session

### Users
- GET `/api/users` - Get all users
- GET `/api/users/trainers` - Get all trainers
- GET `/api/users/:id` - Get user by ID
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user
- PUT `/api/users/:id` - Update a user
- DELETE `/api/users/:id` - Delete a user

## Note

This is a development server. For production, you should implement proper authentication with JWT, password hashing with bcrypt, and other security measures.
