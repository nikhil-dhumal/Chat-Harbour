import { useSelector } from "react-redux"

import { Stack } from "@mui/material"

import MessageInput from "./MessageInput"
import MessageList from "./MessageList"

const Conversation = () => {
  const { activeChat } = useSelector((state) => state.activeChat)

  return (
    <Stack
      sx={{
        width: { xs: "100%", sm: "65%", md: "70%", lg: "75%" },
        display: {
          xs: activeChat ? "flex" : "none",
          sm: "flex"
        },
        height: "100%"
      }}
    >
      {
        activeChat && (
          <>
            <Stack
              gap={2}
              sx={{
                px: 2,
                height: { xs: "92%", sm: "88%" },
                width: "100%",
                overflow: "auto"
              }}
            >
              <MessageList />
            </Stack>
            <MessageInput />
          </>
        )
      }
    </Stack>
  )
}

export default Conversation
