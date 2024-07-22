import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"

const socketHandler = (io) => {
  const userRooms = new Map()
  const onlineUsers = new Map()

  io.on("connection", (socket) => {
    socket.emit("currentOnlineUsers", Array.from(onlineUsers.keys()))

    socket.on("statusOnline", ({ userId }) => {
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, socket.id)
        socket.broadcast.emit("online", userId)
      } else {
        onlineUsers.set(userId, socket.id)
      }
    })

    socket.on("joinChat", async ({ chatId }) => {
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

    socket.on("sendNewChat", async ({ chatId, receiverId, userId }) => {
      try {
        const chat = await chatModel.findById(chatId)
          .populate({
            path: "messages",
            options: { sort: { createdAt: 1 } },
            populate: {
              path: "sentBy",
              model: "User"
            }
          })
          .populate({
            path: "members",
            model: "User"
          })
    
        if (chat) {
          if (!userRooms.has(socket.id)) {
            userRooms.set(socket.id, new Set())
          }

          const userRoomSet = userRooms.get(socket.id)

          if (!userRoomSet.has(chatId)) {
            socket.join(chatId)
            userRoomSet.add(chatId)
          }
    
          if (chat.isGroup) {
            chat.members.forEach(member => {
              if (onlineUsers.has(member.id) && member.id !== userId) {
                io.to(onlineUsers.get(member.id)).emit("newChat", chat)
              }
            })
          } else {
            if (onlineUsers.has(receiverId)) {
              const receiver = chat.members.filter((member) => member.id === userId)

              io.to(onlineUsers.get(receiverId)).emit("newChat", {
                ...chat.toJSON(),
                receiver: receiver[0]
              })
            }
          }
        } else {
          console.log(`Chat ${chatId} not found`)
        }
      } catch (error) {
        console.error(`Error sending new chat ${chatId}:`, error)
      }
    })

    socket.on("sendIsTyping", ({ chatId, userId }) => {
      socket.broadcast.to(chatId).emit("isTyping", { userId, chatId })
    })

    socket.on("sendIsNotTyping", ({ chatId, userId }) => {
      socket.broadcast.to(chatId).emit("isNotTyping", { userId, chatId })
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

          await newMessage.populate({
            path: "sentBy",
            model: "User"
          })

          io.to(chatId).emit("message", {chatId, message: newMessage})
        } else {
          console.log(`Chat ${chatId} not found`)
        }
      } catch (error) {
        console.error(`Error sending message in chat ${chatId}:`, error)
      }
    })

    socket.on("statusOffline", ({ userId }) => {
      if (onlineUsers.has(userId)) {
        onlineUsers.delete(userId)
        socket.broadcast.emit("offline", userId)
      }
    })

    socket.on("disconnect", () => {
      const userId = [...onlineUsers.entries()].find(([_, id]) => id === socket.id)?.[0]

      if (userId) {
        onlineUsers.delete(userId)
        socket.broadcast.emit("offline", userId)
      }

      const rooms = userRooms.get(socket.id)

      if (rooms) {
        rooms.forEach((chatId) => {
          socket.leave(chatId)
        })
      }

      userRooms.delete(socket.id)
    })
  })
}

export default socketHandler
