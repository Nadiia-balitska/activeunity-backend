# ActiveUnity Backend API

Backend API for the ActiveUnity platform — a web-oriented system for coordination of social and volunteer initiatives.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Features

- User authentication
- Event management
- Join/leave events
- User profiles
- Search and filtering
- Pagination
- Protected routes
- Role-based permissions

## Installation

```bash
npm install
```

## Run development server

```bash
npm run dev
```

## Environment Variables
Create *.env*  file:
PORT=5050
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development


## API Base URL
/api/v1

## Main Endpoints

### Auth
- POST /auth/register
- POST /auth/login
- GET /auth/me

### Events
- GET /events
- GET /events/:id
- POST /events
- PUT /events/:id
- DELETE /events/:id
- POST /events/:id/join
- DELETE /events/:id/leave

### Users
- GET /users/profile
- PUT /users/profile

---

#  Git init

```bash
git init
git add .
git commit -m "Initial backend setup"
```
