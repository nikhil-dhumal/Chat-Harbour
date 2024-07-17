import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"

const socketHandler = (io) => {
  const userRooms = new Map()

  io.on("connection", (socket) => {
    socket.on("joinChat", async ({ chatId, userId }) => {
      try {
        const chat = await chatModel.findById(chatId)
        if (chat) {
          if (!userRooms.has(socket.id)) {
            userRooms.set(socket.id, new Set())
          }
          const userRoomSet = userRooms.get(socket.id)
          if (!userRoomSet.has(chatId)) {
            socket.join(chatId)
            userRoomSet.add(chatId)
          }
        } else {
          console.log(`Chat ${chatId} not found`)
        }
      } catch (error) {
        console.error(`Error joining chat ${chatId}:`, error)
      }
    })

    socket.on("sendMessage", async ({ chatId, userId, content }) => {
      try {
        const chat = await chatModel.findById(chatId)

        if (chat) {
          const newMessage = new messageModel({
            sentBy: userId,
            content,
            chatId
          })
          await newMessage.save()

          chat.messages.push(newMessage._id)
          chat.lastMessage = newMessage._id
          await chat.save()

          await newMessage.populate("sentBy", "username")

          io.to(chatId).emit("message", newMessage)
        } else {
          console.log(`Chat ${chatId} not found`)
        }
      } catch (error) {
        console.error(`Error sending message in chat ${chatId}:`, error)
      }
    })

    socket.on("disconnect", () => {
      userRooms.delete(socket.id)
    })
  })
}

export default socketHandler
