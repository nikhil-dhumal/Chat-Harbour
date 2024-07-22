import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import { Box } from "@mui/material"

import GlobalLoading from "../common/GlobalLoading"

import userApi from "../../api/modules/user.api"
import chatApi from "../../api/modules/chat.api"

import { setChats } from "../../redux/features/chatsSlice"
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice"
import { setUser } from "../../redux/features/userSlice"

const MainLayout = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getDetails()

      if (response) dispatch(setUser(response))
      if (err) dispatch(setUser(null))

      setTimeout(() => {
        dispatch(setGlobalLoading(false))
      }, 1000)
    }

    dispatch(setGlobalLoading(true))
    authUser()
  }, [dispatch])

  useEffect(() => {
    const getChats = async () => {
      const { response, err } = await chatApi.allChats()

      if (response) dispatch(setChats(response))
      if (err) dispatch(setChats([]))
    }

    const fetchChatsAndGroups = async () => {
      await getChats()
    }

    if (user) {
      fetchChatsAndGroups()
    }
  }, [user])

  return (
    <>
      <GlobalLoading />
      <Box
        component="main"
        overflow="hidden"
        sx={{
          minHeight: "100dvh",
          minHeight: "100vh"
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default MainLayout