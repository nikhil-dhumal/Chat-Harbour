import express from "express"
import http from "http"
import mongoose from "mongoose"
import { Server } from "socket.io"
import cors from "cors"
import "dotenv/config"

import routes from "./src/routes/index.routes.js"
import socketHandler from "./src/handlers/socket.handler.js"

const app = express()
const server = http.createServer(app) // Create HTTP server using Express app
const io = new Server(server) // Initialize Socket.IO with HTTP server instance

// Middleware
app.use(cors()) // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()) // Parse JSON bodies in requests
app.use(express.urlencoded({ extended: false })) // Parse URL-encoded bodies in requests

// Routes
app.use("/api/v1", routes) // Mount API routes from index.routes.js under /api/v1

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connection established")
    // Start server after successful MongoDB connection
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is listening on port ${process.env.PORT || 5000}`)
    })
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1) // Exit process on connection error
  })

// Socket.IO setup
socketHandler(io)
