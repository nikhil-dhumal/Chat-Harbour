import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useTheme } from "@emotion/react"
import { IconButton, Stack, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { useSocket } from "../../contexts/SocketContext"

const MessageInput = () => {
  const theme = useTheme()

  const { sendMessage, isTyping, isNotTyping } = useSocket()
  
  const { activeChat } = useSelector((state) => state.activeChat)

  const [message, setMessage] = useState("")
  const [typingTimeout, setTypingTimeout] = useState(null)

  const sendMessageHandler = () => {
    if (message.trim() === "") return

    sendMessage(activeChat.id, message.trim())
    setMessage("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessageHandler()
    }
  }

  useEffect(() => {
    if (!activeChat) return

    const handleTyping = () => {
      // isTyping(activeChat.id)

      clearTimeout(typingTimeout)

      const timeout = setTimeout(() => {
        // isNotTyping(activeChat.id)
      }, 3000)

      setTypingTimeout(timeout)
    }

    handleTyping()

    return () => {
      clearTimeout(typingTimeout)
    }
  }, [message, activeChat, isTyping, isNotTyping, typingTimeout])

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={1}
      sx={{
        width: "100%",
        height: "10vh",
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
      <IconButton onClick={sendMessageHandler}>
        <SendIcon />
      </IconButton>
    </Stack>
  )
}

export default MessageInput
