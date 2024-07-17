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
    origin: "http://localhost:3000"
  }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/v1", routes)

// MongoDB Connection
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
