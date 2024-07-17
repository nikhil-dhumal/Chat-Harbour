import { useDispatch, useSelector } from "react-redux"

import { useTheme } from "@emotion/react"
import { Avatar, Stack, Typography } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"

import chatApi from "../../api/modules/chat.api"

import { setActiveChat } from "../../redux/features/activeChatSlice"

import getProfileImg from "../../utils/getProfileImg"

const ChatList = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const { chats } = useSelector((state) => state.chats)

  const handleClick = async (id) => {
    const { response, err } = await chatApi.details({ chatId: id })

    if (response) dispatch(setActiveChat(response))
    if (err) dispatch(setActiveChat(null))
  }

  return (
    <Stack
      gap={2}
      sx={{
        height: "100%",
        width: "100%",
        mb: { xs: 0, md: 2 },
        pt: 2,
        pl: 2,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none"
        },
        scrollbarWidth: "none"
      }}
    >
      {
        chats?.map((chat, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            gap={2}
            sx={{
              cursor: "pointer"
            }}
            onClick={() => handleClick(chat.id)}
          >
            {
              chat.isGroup
                ? (
                  <Avatar><GroupsIcon /></Avatar>
                ) : (
                  <Avatar
                    alt={chat.receiver.username}
                    src={getProfileImg({ gender: chat.receiver.gender, username: chat.receiver.username })}
                  />
                )
            }
            <Stack
              sx={{
                flexGrow: 1
              }}
            >
              {
                chat.isGroup
                  ? (
                    <Typography>{chat.groupName}</Typography>
                  ) : (
                    <Typography>{chat.receiver.username}</Typography>
                  )
              }
              {
                chat.lastMessage && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      WebkitLineClamp: 1,
                      textOverflow: "ellipsis"
                    }}
                  >
                    {chat.lastMessage.content}
                  </Typography>
                )
              }
            </Stack>
          </Stack>
        ))
      }
    </Stack >
  )
}

export default ChatList