import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"

import { useTheme } from "@emotion/react"
import { IconButton, Stack, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

import { useSocket } from "../../contexts/SocketContext"

const MessageInput = () => {
  const theme = useTheme()

  const { sendMessage, isTyping, isNotTyping } = useSocket()
  
  const typingTimeoutRef = useRef(null)
  const isTypingRef = useRef(false)

  const { activeChat } = useSelector((state) => state.activeChat)

  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim() === "") return

    if (isTypingRef.current) {
      isNotTyping(activeChat.id)
      isTypingRef.current = false
    }

    sendMessage(activeChat.id, message.trim())
    setMessage("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (!activeChat) {
      setMessage("")
      return
    }
    setMessage("")
  }, [activeChat?.id])

  useEffect(() => {
    if (!activeChat) return

    const handleTyping = () => {
      if (message.trim() !== "") {
        if (!isTypingRef.current) {
          isTyping(activeChat.id)
          isTypingRef.current = true
        }
        
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
          isNotTyping(activeChat.id)
          isTypingRef.current = false
        }, 2000)
      } else if (isTypingRef.current) {
        isNotTyping(activeChat.id)
        isTypingRef.current = false
      }
    }

    handleTyping()

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [message, activeChat, isTyping, isNotTyping])

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={1}
      sx={{
        width: "100%",
        minHeight: "10vh",
        minHeight: "10dvh",
        pl: 2,
        pr: 1,
        borderTop: `1px solid ${theme.palette.secondary.main}`
      }}
    >
      <TextField
        id="input-message"
        placeholder="Type your message..."
        variant="outlined"
        sx={{
          flexGrow: 1,
          ".MuiInputBase-input": {
            py: "10px"
          }
        }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Stack>
  )
}

export default MessageInput
