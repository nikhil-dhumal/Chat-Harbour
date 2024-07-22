import { useDispatch, useSelector } from "react-redux"

import { Avatar, Badge, Stack, Typography } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"

import chatApi from "../../api/modules/chat.api"

import { setActiveChat } from "../../redux/features/activeChatSlice"

import getProfileImg from "../../utils/getProfileImg"

const ChatList = () => {
  const dispatch = useDispatch()

  const { chats } = useSelector((state) => state.chats)
  const { onlineUsers } = useSelector((state) => state.onlineUsers)

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
                  <Badge
                    overlap="circular"
                    variant="dot"
                    sx={{
                      "& .MuiBadge-dot": {
                        bgcolor: onlineUsers.includes(chat.receiver.id)
                          ? "green"
                          : "transparent"
                      },
                    }}
                  >
                    <Avatar
                      alt={chat.receiver.username}
                      src={getProfileImg({ gender: chat.receiver.gender, username: chat.receiver.username })}
                    />
                  </Badge>
                )
            }
            <Stack alignItems="flex-start">
              <Typography>
                {chat.isGroup ? chat.groupName : chat.receiver.username}
              </Typography>
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