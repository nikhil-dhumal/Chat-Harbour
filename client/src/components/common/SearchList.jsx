import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { Avatar, Stack, Typography } from "@mui/material"

import userApi from "../../api/modules/user.api"
import chatApi from "../../api/modules/chat.api"

import { setActiveChat } from "../../redux/features/activeChatSlice"

import getProfileImg from "../../utils/getProfileImg"

const SearchList = ({ searchQuery }) => {
  const dispatch = useDispatch()

  const [users, setusers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const { response, err } = await userApi.getUserByName({ username: searchQuery })

      if (response) setusers(response)
      if (err) setusers([])
    }

    if (searchQuery.length > 0) getUsers()
  }, [searchQuery])

  const handleClick = async (id) => {
    const { response, err } = await chatApi.newChat({ receiverId: id })

    if (response) dispatch(setActiveChat(response))
    if (err) dispatch(setActiveChat(null))
  }

  return (
    <Stack
      gap={2}
      sx={{
        height: "100%",
        width: "100%",
        mb: { xs: 0, md: 2 },
        pt: 2,
        pl: 2,
        overflowY: "auto",
      }}
    >
      {
        users?.map((user, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            gap={2}
            sx={{
              cursor: "pointer"
            }}
            onClick={() => handleClick(user.id)}
          >
            <Avatar
              alt={user.username}
              src={
                getProfileImg({
                  gender: user.gender,
                  username: user.username
                })
              }
            />
            <Typography>{user.username}</Typography>
          </Stack>
        ))
      }
    </Stack>
  )
}

export default SearchList