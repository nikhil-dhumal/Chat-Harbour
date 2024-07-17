import { useTheme } from "@emotion/react"
import { Stack, Typography } from "@mui/material"

import Favicon from "../../../images/favicon.png"

const QuoteBox = () => {
  const theme = useTheme()

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        flex: 2,
        p: 5,
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
        backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
      }}
    >
      <img src={Favicon} style={{ height: "20%" }}/>
      <Typography variant="h3" sx={{ fontWeight: "700", mb: "10%" }}>Chat Harbour</Typography>
      <Typography variant="h6" sx={{ textAlign: "center", mb: "10%" }}>
        Spreading happiness through every chat, connecting hearts with every message.
      </Typography>
      <Typography variant="h4">Enjoy!</Typography>
    </Stack>
  )
}

export default QuoteBox