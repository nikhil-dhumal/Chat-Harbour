import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Paper, Stack } from "@mui/material"

import QuoteBox from "../components/common/QuoteBox"
import SignupBox from "../components/common/SignupBox"

const SignupPage = () => {
  const navigate = useNavigate()
  
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (user) navigate("/")
  }, [user])

  return (
    <Paper
      elevation={24}
      sx={{
        mt: { xs: 0, md: "5vh" },
        mx: { xs: 0, md: "10%" },
        height: { xs: "100vh", md: "90vh" },
        borderRadius: { xs: 0, md: "10px" },
        backgroundColor: "background.default"
      }}
    >
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          height: "100%",
          borderTopLeftRadius: { xs: 0, md: "10px" },
          borderBottomLeftRadius: { xs: 0, md: "10px" }
        }}
      >
        <QuoteBox />
        <SignupBox />
      </Stack>
    </Paper>
  )
}

export default SignupPage