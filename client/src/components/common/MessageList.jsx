import { useLayoutEffect, useRef } from "react"
import { useSelector } from "react-redux"

import { Stack } from "@mui/material"

import Message from "./Message"

const MessageList = () => {
  const { activeChat } = useSelector((state) => state.activeChat)

  const lastMessageRef = useRef(null)

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "auto" })
  }

  useLayoutEffect(() => {
    scrollToBottom()
  }, [activeChat])

  return (
    <Stack
      gap={3}
      sx={{
        py: 1,
        overflowY: "auto",
        height: "100%",
        "&::-webkit-scrollbar": {
          display: "none"
        },
        scrollbarWidth: "none"
      }}
    >
      {
        activeChat?.messages?.map((message, index) => (
          <Message
            message={message}
            key={index}
            ref={index === activeChat.messages.length - 1 ? lastMessageRef : null}
          />
        ))
      }
    </Stack>
  )
}

export default MessageList
