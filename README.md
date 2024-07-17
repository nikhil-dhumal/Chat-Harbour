# Chat App: Chat Harbour

This project is a full-featured real-time chat application built using the MERN stack (MongoDB, Express.js, React, Node.js). It leverages Socket.IO for seamless, low-latency communication between users. The user interface is designed with Material-UI, ensuring a responsive and visually appealing experience. The app allows users to discover friends and engage in one-on-one or group conversations effortlessly. Key features include user authentication, chat creation, and real-time messaging.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Sreenshots](#sreenshots)

## Introduction

Chat Harbour is a real-time chat application designed to:

 - Connect with Friends: Discover and connect with new people easily.
 - Engage in Conversations: Enjoy seamless one-on-one or group chats.
 - Stay Connected: Communicate instantly with friends and groups in real-time.
 - Enjoy a Smooth Experience: Benefit from a user-friendly interface and low-latency messaging.

## Features

 - **User Authentication:** Secure signup and login functionalities.
 - **One-on-One Chat:** Private messaging between two users.
 - **Group Chat:** Create and join group conversations.
 - **Search Usernames:** Easily find and add friends by their usernames.
 - **User Interaction:** Real-time messaging and notifications.
 - **Responsive Design:** Built with Material-UI for an appealing and responsive interface.

## Technologies

### Technologies and Libraries Used

#### Frontend:
- **React.js** - JavaScript library for building user interfaces. [Reference](https://reactjs.org/)
- **HTML/CSS** - Standard web technologies for structuring and styling web pages.
- **Material-UI (MUI)** - React components library for building UI components. [Reference](https://mui.com/)

#### Backend:
- **Node.js** - JavaScript runtime for server-side applications. [Reference](https://nodejs.org/)
- **Express.js** - Web framework for Node.js, used for building APIs and handling HTTP requests. [Reference](https://expressjs.com/)
- **MongoDB** - NoSQL database used for storing application data. [Reference](https://www.mongodb.com/)

#### Other Tools and Libraries:
- **Socket.IO** - Library for real-time web applications, enabling real-time, bi-directional communication between web clients and servers. [Reference](https://socket.io/)
- **axios** - HTTP client for making requests to the TMDB API and server. [GitHub](https://github.com/axios/axios)
- **jsonwebtoken** - Library for generating and verifying JSON Web Tokens (JWTs) for authentication. [GitHub](https://github.com/auth0/node-jsonwebtoken)
- **mongoose** - ODM library for MongoDB and Node.js. [Reference](https://mongoosejs.com/)
- **react-router-dom** - DOM bindings for React Router, for handling navigation and routing. [GitHub](https://github.com/ReactTraining/react-router)
- **react-redux** - Official Redux binding for React to manage state. [GitHub](https://github.com/reduxjs/react-redux)
- **formik** - Form library for React. [GitHub](https://github.com/formium/formik)

## Installation

### Prerequisites
Before starting, ensure you have the following installed:
- **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/), which includes npm.

### Step 1: Clone the Repository
Clone the project repository from GitHub:

```bash
git clone https://github.com/nikhil-dhumal/Chat-Harbour.git
cd Chat-Harbour
```

### Step 2: Install Dependencies
Client (Frontend)
````bash
cd client
npm install
````

Server (Backend)
```bash
cd ../server
npm install
````

### Step 3: Set Up Environment Variables
- Create .env files for both client and server according to .env.example files.
- Update the variables in .env as necessary for your local setup. Ensure you add .env to your .gitignore file to keep sensitive information secure.

### Step 4: Run the Development Servers
Client (Frontend)
````bash
cd client
npm run dev
````
Access the frontend at http://localhost:3000.

Server (Backend)
````bash
cd ../server
npm start
````
The backend runs at http://localhost:5000.

### Step 5: Accessing the Application
Open your web browser and go to http://localhost:3000 to view the frontend application.

## Screenshots

### Desktop


### Mobile
