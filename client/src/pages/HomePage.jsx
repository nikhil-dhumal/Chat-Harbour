import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Box, Paper, Stack } from "@mui/material"

import ChatsBoard from "../components/common/ChatsBoard"
import Conversation from "../components/common/Conversation"
import ProfileBar from "../components/common/ProfileBar"

const HomePage = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)

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
          m: "5vh",
          height: "90vh",
          backgroundImage: "linear-gradient(45deg, rgb(35, 181, 211, 0.3), rgb(167, 85, 194, 0.3)) !important"
        }}
      >
        <ProfileBar />
        <Stack>
          <Stack
            direction="row"
            sx={{
              height: "82vh"
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