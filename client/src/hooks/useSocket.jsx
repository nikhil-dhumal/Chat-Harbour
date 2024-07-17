import { useEffect, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"

import { addMessage } from "../redux/features/activeChatSlice"
import { addChat } from "../redux/features/chatsSlice"

const SOCKET_URL = import.meta.env.VITE_BACKEND_BASE_URL

const useSocket = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { chats } = useSelector((state) => state.chats)

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(SOCKET_URL)

    newSocket.on("connect", () => {
      chats.forEach((chat) => {
        newSocket.emit("joinChat", { chatId: chat.id, userId: user.id })
      })
    })

    newSocket.on("message", (message) => {
      dispatch(addMessage(message))
    })

    newSocket.on("disconnect", () => {
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [chats, dispatch, user])

  const sendMessage = useCallback((chatId, content) => {
    if (socket) {
      socket.emit("sendMessage", { chatId, userId: user.id, content })
    }
  }, [socket, user])

  return { sendMessage }
}

export default useSocket