import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Avatar, Box, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material"
import LockResetIcon from "@mui/icons-material/LockReset"
import LogoutIcon from "@mui/icons-material/Logout"

import { setUser } from "../../redux/features/userSlice"

import getProfileImg from "../../utils/getProfileImg"

const UserMenu = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)

  const [anchorEl, setAnchorEl] = useState(null)

  const toggleMenu = (e) => setAnchorEl(e.currentTarget)

  const handleUpdate = () => {
    setAnchorEl(null)
    navigate("/update")
  }

  const handleSignOut = () => {
    dispatch(setUser(null))
    navigate("/signin")
  }

  return (
    <Box
      sx={{
        height: "100%"
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          height: "100%",
          cursor: "pointer",
          userSelect: "none",
          position: "relative"
        }}
        onClick={toggleMenu}
      >
        <Avatar
          alt={`${user.username}`}
          src={
            getProfileImg({
              gender: user.gender,
              username: user.username
            })
          }
        />
        <Typography variant="subtitle1">{user.username}</Typography>
      </Stack>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleUpdate} >
          <ListItemIcon>
            <LockResetIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Update Password</Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOut} >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Sign out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu