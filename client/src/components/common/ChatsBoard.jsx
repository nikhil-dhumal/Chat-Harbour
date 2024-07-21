import { useState } from "react"
import { useSelector } from "react-redux"

import { useTheme } from "@emotion/react"
import { InputAdornment, Stack, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import AddGroup from "./AddGroup"
import ChatList from "../common/ChatList"
import SearchList from "../common/SearchList"

const ChatsBoard = () => {
  const theme = useTheme()

  const { activeChat } = useSelector((state) => state.activeChat)

  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Stack
      sx={{
        width: { xs: "100%", sm: "35%", md: "30%", lg: "25%" },
        display: {
          xs: activeChat ? "none" : "flex",
          sm: "flex"
        },
        height: "100%",
        borderRight: { xs: "none", sm: `1px solid ${theme.palette.secondary.main}` }
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          width: "100%",
          py: 2,
          pl: 2,
          pr: 1,
          borderBottom: `1px solid ${theme.palette.secondary.main}`,
        }}
      >
        <TextField
          variant="outlined"
          id="search"
          sx={{
            width: "100%",
            ".MuiInputBase-input": {
              py: "10px"
            }
          }}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <AddGroup />
      </Stack>
      {
        searchQuery.length === 0
          ? <ChatList />
          : <SearchList searchQuery={searchQuery} />
      }
    </Stack>
  )
}

export default ChatsBoard
