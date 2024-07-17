import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"

import { Box } from "@mui/material"

import GlobalLoading from "../common/GlobalLoading"

import userApi from "../../api/modules/user.api"
import { setUser } from "../../redux/features/userSlice"
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice"

const MainLayout = () => {
  const dispatch = useDispatch()

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

  return (
    <>
      <GlobalLoading />
      <Box
        component="main"
        flexGrow={1}
        overflow="hidden"
        minHeight="100vh"
      >
        <Outlet />
      </Box>
    </>
  )
}

export default MainLayout