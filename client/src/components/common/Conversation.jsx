import { useSelector } from "react-redux"

import { Stack } from "@mui/material"

import MessageInput from "./MessageInput"
import MessageList from "./MessageList"

const Conversation = () => {
  const { activeChat } = useSelector((state) => state.activeChat)

  return (
    <Stack
      sx={{
        flexGrow: 1,
        height: "100%",
      }}
    >
      {
        activeChat && (
          <>
            <Stack
              gap={2}
              sx={{
                px: 2,
                pt: 1,
                flexGrow: 1,
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
