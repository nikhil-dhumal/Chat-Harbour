import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    // Event: Join chat room
    socket.on("joinChat", async ({ chatId, userId }) => {
      const chat = await chatModel.findById(chatId)

      if (chat) {
        socket.join(chatId)
        io.to(chatId).emit("userConnected", { userId, chatId })
        console.log(`User ${userId} joined chat ${chatId}`)
      } else {
        console.log(`Chat ${chatId} not found`)
      }
    })

    // Event: Send message
    socket.on("sendMessage", async ({ chatId, userId, content }) => {
      const chat = await chatModel.findById(chatId)

      if (chat) {
        const newMessage = new messageModel({
          sentBy: userId,
          content
        })

        await newMessage.save()

        chat.messages.push(message.id)
        chat.lastMessage = message.id

        await chat.save()

        io.to(chatId).emit("message", { userId, chatId, message })
        console.log(`Message sent in chat ${chatId} by user ${userId}`)
      } else {
        console.log(`Chat ${chatId} not found`)
      }
    })

    // Event: Typing
    socket.on("typing", async ({ chatId, userId }) => {
      const chat = await chatModel.findById(chatId)

      if (chat) {
        io.to(chatId).emit("typing", { userId, chatId })
      } else {
        console.log(`Chat ${chatId} not found`)
      }
    })

    // Event: Stop typing
    socket.on("stopTyping", async ({ chatId, userId }) => {
      const chat = await chatModel.findById(chatId)

      if (chat) {
        io.to(chatId).emit("stopTyping", { userId, chatId })
      } else {
        console.log(`Chat ${chatId} not found`)
      }
    })

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`)
    })
  })
}

export default socketHandler
