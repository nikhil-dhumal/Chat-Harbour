import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { useTheme } from "@emotion/react"
import { InputAdornment, Stack, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import chatApi from "../../api/modules/chat.api"

import AddGroup from "./AddGroup"
import ChatList from "../common/ChatList"
import SearchList from "../common/SearchList"

import { setChats } from "../../redux/features/chatsSlice"
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice"
import { setGroupEvent } from "../../redux/features/groupEventSlice"

const ChatsBoard = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { groupEvent } = useSelector((state) => state.groupEvent)

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const getChats = async () => {
      const { response, err } = await chatApi.allChats()

      if (response) dispatch(setChats(response))
      if (err) dispatch(setChats([]))
    }

    const fetchChatsAndGroups = async () => {
      dispatch(setGlobalLoading(true))
      await getChats()
      dispatch(setGlobalLoading(false))
    }

    if (user) {
      dispatch(setGroupEvent(false))
      fetchChatsAndGroups()
    }
  }, [user, searchQuery, groupEvent])

  return (
    <Stack
      sx={{
        flex: 1,
        px: 2,
        pt: 2,
        height: "100%",
        borderRight: `1px solid ${theme.palette.secondary.main}`
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          id="search"
          sx={{
            width: "100%"
          }}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ pl: 0 }} />
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
