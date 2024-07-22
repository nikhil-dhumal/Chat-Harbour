import { useSelector } from "react-redux"

import { Box, Paper } from "@mui/material"
import { MutatingDots } from "react-loader-spinner"

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading)

  return (
    <Paper
      sx={{
        opacity: globalLoading ? 1 : 0,
        pointerEvents: "none",
        transition: "all .5s ease",
        position: "fixed",
        width: "100%",
        height: "100vh",
        zIndex: 999
      }}
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "max-content",
        height: "max-content"
      }}>
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#23B5D3"
          secondaryColor="#A755C2"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      </Box>
    </Paper>
  )
}

export default GlobalLoading