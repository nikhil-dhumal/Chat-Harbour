import { useDispatch, useSelector } from "react-redux"

import { useTheme } from "@emotion/react"
import { Avatar, IconButton, Stack, Typography } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"
import CloseIcon from "@mui/icons-material/Close"

import UserMenu from "./UserMenu"
import ToggleTheme from "./ToggleTheme"

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
          height: "8vh",
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
            p: 2,
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
            flexGrow: 1,
            height: "100%"
          }}
        >
          {
            activeChat && (
              <>
                <IconButton onClick={handleChatClose} sx={{ ml: 1 }}>
                  <CloseIcon />
                </IconButton>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{
                    pr: 2
                  }}
                >
                  {activeChat.isGroup ? (
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
                  )}
                  <Typography>
                    {activeChat.isGroup ? activeChat.groupName : activeChat.receiver.username}
                  </Typography>
                </Stack>
              </>
            )
          }
        </Stack>
      </Stack>
    )
  )
}

export default ProfileBar
