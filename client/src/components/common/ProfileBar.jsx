import { useDispatch, useSelector } from "react-redux"

import { useTheme } from "@emotion/react"
import { Avatar, IconButton, Stack, Typography } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"
import CloseIcon from "@mui/icons-material/Close"

import UserMenu from "./UserMenu"
import ToggleTheme from "./ToggleTheme"
import TypingStatus from "./TypingStatus"

import { setActiveChat } from "../../redux/features/activeChatSlice"

import getProfileImg from "../../utils/getProfileImg"

const ProfileBar = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { activeChat } = useSelector((state) => state.activeChat)

  const handleChatClose = () => {
    dispatch(setActiveChat(null))
  }

  return (
    user && (
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          width: "100%",
          height: { xs: "7%", sm: "9%" },
          borderBottom: `1px solid ${theme.palette.secondary.main}`
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            width: { xs: "100%", sm: "35%", md: "30%", lg: "25%" },
            display: {
              xs: activeChat ? "none" : "flex",
              sm: "flex"
            },
            height: "100%",
            py: 2,
            pl: 2,
            pr: 1,
            borderRight: { xs: "none", sm: `1px solid ${theme.palette.secondary.main}` }
          }}
        >
          <UserMenu />
          <ToggleTheme />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          sx={{
            width: { xs: "100%", sm: "65%", md: "70%", lg: "75%" },
            display: {
              xs: activeChat ? "flex" : "none",
              sm: "flex"
            },
            pl: 2,
            pr: 1,
            height: "100%"
          }}
        >
          {
            activeChat && (
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{
                    pr: 2
                  }}
                >
                  {
                    activeChat.isGroup ? (
                      <Avatar>
                        <GroupsIcon />
                      </Avatar>
                    ) : (
                      <Avatar
                        alt={activeChat.receiver.username}
                        src={getProfileImg({
                          gender: activeChat.receiver.gender,
                          username: activeChat.receiver.username
                        })}
                      />
                    )
                  }
                  <Stack alignItems="flex-start">
                    <Typography>
                      {activeChat.isGroup ? activeChat.groupName : activeChat.receiver.username}
                    </Typography>
                    <TypingStatus chat={activeChat} />
                  </Stack>
                </Stack>
                <IconButton onClick={handleChatClose}>
                  <CloseIcon />
                </IconButton>
              </>
            )
          }
        </Stack>
      </Stack>
    )
  )
}

export default ProfileBar
