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
        "--full-height": "100vh",
        "@supports (height: 100dvh)": {
          "--full-height": "100dvh"
        },
        height: "var(--full-height)"
      }}
    >
      <Paper
        elevation={10}
        sx={{
          position: "relative",
          top: 0,
          left: 0,
          m: { xs: 0, md: "5%" },
          height: { xs: "100%", md: "90%" },
          backgroundImage: "linear-gradient(45deg, rgb(35, 181, 211, 0.5), rgb(167, 85, 194, 0.5))"
          ,
          borderRadius: { xs: 0, md: "5px" }
        }}
      >
        <ProfileBar />
        <Stack
          direction="row"
          sx={{
            height: { xs: "93%", md: "91%" },
            width: "100%"
          }}
        >
          <ChatsBoard />
          <Conversation />
        </Stack>
      </Paper>
    </Box>
  )
}

export default HomePage