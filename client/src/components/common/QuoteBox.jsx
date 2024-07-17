import { useTheme } from "@emotion/react"
import { Box, Stack, Typography } from "@mui/material"

import Favicon from "../../../images/favicon.png"

import ToggleTheme from "./ToggleTheme"

const QuoteBox = () => {
  const theme = useTheme()

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "relative",
        flex: { xs: 1, sm: 2 },
        maxHeight: { xs: "35%", sm: "100%" },
        py: { xs: 0, sm: 5 },
        px: { xs: 2, sm: 5 },
        borderTopLeftRadius: { xs: 0, md: "10px" },
        borderBottomLeftRadius: { xs: 0, md: "10px" },
        backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px"
        }}
      >
        <ToggleTheme />
      </Box>
      <Box
        sx={{
          height: { xs: "15%", lg: "20%" }
        }}
      >
        <img src={Favicon} style={{ height: "100%" }} />
      </Box>
      <Typography
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", lg: "3rem" },
          fontWeight: { xs: "500", md: "700" },
          mb: { xs: "2%", sm: "10%" }
        }}
      >
        Chat Harbour
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
          textAlign: "center",
          mb: { xs: "2%", sm: "10%" }
        }}
      >
        Spreading happiness through every chat, connecting hearts with every message.
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem" }
        }}
      >
        Enjoy!
      </Typography>
    </Stack>
  )
}

export default QuoteBox