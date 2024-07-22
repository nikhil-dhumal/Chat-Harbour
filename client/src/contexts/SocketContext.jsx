import React, { createContext, useContext, useEffect, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"

import { addMessage } from "../redux/features/activeChatSlice"
import { addChat, addMessageToChat } from "../redux/features/chatsSlice"
import { addUser, removeUser, setOnlineUsers } from "../redux/features/onlineUsersSlice"
import { addUserTyping, removeUserTyping } from "../redux/features/usersTypingSlice"

const SocketContext = createContext()

const SOCKET_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { chats } = useSelector((state) => state.chats)

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_URL)

      newSocket.on("connect", () => {
        newSocket.emit("statusOnline", { userId: user.id })

        chats.forEach((chat) => {
          newSocket.emit("joinChat", { chatId: chat.id })
        })
      })

      newSocket.on("currentOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      })

      newSocket.on("online", (userId) => {
        dispatch(addUser(userId))
      })

      newSocket.on("offline", (userId) => {
        dispatch(removeUser(userId))
      })

      newSocket.on("newChat", (chat) => {
        dispatch(addChat(chat))
      })

      newSocket.on("message", ({ chatId, message }) => {
        dispatch(addMessage({ chatId, message }))
        dispatch(addMessageToChat({ chatId, message }))
      })

      newSocket.on("isTyping", ({ userId, chatId }) => {
        dispatch(addUserTyping({ userId, chatId }))
      })

      newSocket.on("isNotTyping", ({ userId, chatId }) => {
        dispatch(removeUserTyping({ userId, chatId }))
      })

      newSocket.on("disconnect", () => {
        newSocket.emit("statusOffline", { userId: user.id })
      })

      newSocket.on("connect_error", (err) => {
        console.error(`Connection error: ${err.message}`)
      })

      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }
  }, [chats, dispatch, user])

  const sendNewChat = useCallback((chatId, receiverId) => {
    if (socket) {
      socket.emit("sendNewChat", { chatId, receiverId, userId: user.id })
    }
  }, [socket, user])

  const sendMessage = useCallback((chatId, content) => {
    if (socket) {
      socket.emit("sendMessage", { chatId, userId: user.id, content })
    }
  }, [socket, user])

  const isTyping = useCallback((chatId) => {
    if (socket) {
      socket.emit("sendIsTyping", { chatId, userId: user.id })
    }
  }, [socket, user])

  const isNotTyping = useCallback((chatId) => {
    if (socket) {
      socket.emit("sendIsNotTyping", { chatId, userId: user.id })
    }
  }, [socket, user])

  return (
    <SocketContext.Provider value={{ sendMessage, isTyping, isNotTyping, sendNewChat }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(SocketContext)
}
