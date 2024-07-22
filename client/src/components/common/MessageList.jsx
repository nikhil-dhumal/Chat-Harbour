import { useLayoutEffect, useRef } from "react"
import { useSelector } from "react-redux"

import { Stack } from "@mui/material"

import Message from "./Message"

const MessageList = () => {
  const { activeChat } = useSelector((state) => state.activeChat)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }

  useLayoutEffect(() => {
    scrollToBottom()
  }, [activeChat])

  return (
    <>
      <Stack
        gap={3}
        sx={{
          pt: 2,
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
            <Message message={message} key={index} />
          ))
        }
      </Stack>
      <div ref={messagesEndRef} />
    </>
  )
}

export default MessageList
