import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Paper, Stack } from "@mui/material"

import QuoteBox from "../components/common/QuoteBox"
import PassUpdateBox from "../components/common/PassUpdateBox"

const PassUpdatePage = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (!user) navigate("/signin")
  }, [user]) 

  return (
    <Paper
      elevation={24}
      sx={{
        mt: "5vh",
        mx: "10%",
        height: "90vh",
        borderRadius: "10px",
        backgroundColor: "background.default"
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: 1,
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px"
        }}
      >
        <QuoteBox />
        <PassUpdateBox />
      </Stack>
    </Paper>
  )
}

export default PassUpdatePage