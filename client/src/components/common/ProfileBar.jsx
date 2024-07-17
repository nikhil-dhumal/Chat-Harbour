import { useDispatch, useSelector } from "react-redux"

import { useTheme } from "@emotion/react"
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"
import CloseIcon from "@mui/icons-material/Close"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"

import UserMenu from "./UserMenu"

import { themeModes } from "../../configs/theme.configs"

import { setActiveChat } from "../../redux/features/activeChatSlice"
import { setThemeMode } from "../../redux/features/themeModeSlice"

import getProfileImg from "../../utils/getProfileImg"

const ProfileBar = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { activeChat } = useSelector((state) => state.activeChat)
  const { themeMode } = useSelector((state) => state.themeMode)

  const handleChatClose = () => {
    dispatch(setActiveChat(null))
  }

  const onSwithTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
    dispatch(setThemeMode(theme))
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
            flex: 1,
            height: "100%",
            p: 2,
            borderRight: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          <UserMenu />
          <IconButton
            sx={{ color: "inherit" }}
            onClick={onSwithTheme}
          >
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          sx={{
            flex: 4
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
