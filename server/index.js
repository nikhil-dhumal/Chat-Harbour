import express from "express"
import http from "http"
import mongoose from "mongoose"
import { Server } from "socket.io"
import cors from "cors"
import "dotenv/config"

import routes from "./src/routes/index.routes.js"
import socketHandler from "./src/handlers/socket.handler.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
})

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`)
  next()
})

app.use("/api/v1", routes)

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connection established")

    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is listening on port ${process.env.PORT || 5000}`)

      socketHandler(io)
    })
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

server.on("error", (err) => {
  console.error("HTTP server error:", err)
  process.exit(1)
})
