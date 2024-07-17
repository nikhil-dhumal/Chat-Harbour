import { useLayoutEffect, useRef } from "react"
import { useSelector } from "react-redux"

import { Stack } from "@mui/material"

import Message from "./Message"

const MessageList = () => {
  const { activeChat } = useSelector((state) => state.activeChat)
  
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useLayoutEffect(() => {
    scrollToBottom()
  }, [activeChat])

  return (
    <Stack
      gap={3}
      sx={{
        overflowY: "auto",
        maxHeight: "80vh",
        "&::-webkit-scrollbar": {
          display: "none"
        },
        scrollbarWidth: "none"
      }}
    >
      {
        activeChat?.messages?.map((message, index) => (
          <Message message={message} key={index} />
        ))
      }
      <div ref={messagesEndRef} />
    </Stack>
  )
}

export default MessageList
