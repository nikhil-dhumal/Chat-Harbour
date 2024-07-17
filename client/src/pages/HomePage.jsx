import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Box, Paper, Stack } from "@mui/material"

import ChatsBoard from "../components/common/ChatsBoard"
import Conversation from "../components/common/Conversation"
import ProfileBar from "../components/common/ProfileBar"

import { themeModes } from "../configs/theme.configs"

const HomePage = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)
  const { themeMode } = useSelector((state) => state.themeMode)

  useEffect(() => {
    if (!user) navigate("/signin")
  }, [user])

  return (
    <Box
      sx={{
        position: "absolute",
        height: "100vh",
        width: "100%",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          position: "relative",
          top: 0,
          left: 0,
          m: { xs: 0, md: "5vh" },
          height: { xs: "100vh", md: "90vh" },
          backgroundImage:
            themeMode === themeModes.dark
              ? "linear-gradient(45deg, rgb(35, 181, 211, 0.5), rgb(167, 85, 194, 0.5)) !important"
              : "linear-gradient(45deg, rgb(35, 181, 211, 0.7), rgb(167, 85, 194, 0.7)) !important"
          ,
          borderRadius: { xs: 0, md: "5px" }
        }}
      >
        <ProfileBar />
        <Stack>
          <Stack
            direction="row"
            sx={{
              height: { xs: "92vh", md: "82vh" }
            }}
          >
            <ChatsBoard />
            <Conversation />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default HomePage