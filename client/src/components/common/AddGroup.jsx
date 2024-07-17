import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"


import { LoadingButton } from "@mui/lab"
import { Box, Chip, IconButton, MenuItem, Modal, OutlinedInput, Select, Stack, TextField } from "@mui/material"
import GroupAddIcon from "@mui/icons-material/GroupAdd"

import userApi from "../../api/modules/user.api"
import chatApi from "../../api/modules/chat.api"


import { setGroupEvent } from "../../redux/features/groupEventSlice"
import { setActiveChat } from "../../redux/features/activeChatSlice"

const AddGroup = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [users, setUsers] = useState([])
  const [groupMembers, setGroupMembers] = useState([])
  const [isAddGroupRequest, setIsAddGroupRequest] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const { response, err } = await userApi.getUserByName({ username: "" })

      if (response) setUsers(response)
      if (err) setUsers([])
    }

    if (open) fetchUsers()
  }, [open])

  const handleGroupMembers = (e) => {
    const {
      target: { value },
    } = e
    setGroupMembers(
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handleClose = () => {
    setOpen(false)
    setGroupName("")
    setUsers([])
    setGroupMembers([])
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddGroup()
    }
  }

  const handleAddGroup = async () => {
    setIsAddGroupRequest(true)

    const memberIds = groupMembers.map((i) => users[i].id)

    const { response, err } = await chatApi.newGroupChat({ groupName, memberIds })

    if (response) {
      toast.success(`${groupName} created successfully`)
      dispatch(setActiveChat(response))
    }
    if (err) toast.error(`${err}`)

    setIsAddGroupRequest(false)
    dispatch(setGroupEvent(true))
    handleClose()
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <GroupAddIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={5}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            height: "50%",
            bgcolor: "background.default",
            p: 5
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            type="text"
            name="groupName"
            placeholder="group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Select
            multiple
            value={groupMembers}
            onChange={handleGroupMembers}
            sx={{
              width: "100%"
            }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={`${users[value].username}`} />
                ))}
              </Box>
            )}
          >
            {
              users?.map((user, index) => (
                <MenuItem
                  key={index}
                  value={index}
                >
                  {user.username}
                </MenuItem>
              ))
            }
          </Select>
          <LoadingButton
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            loading={isAddGroupRequest}
            onClick={handleAddGroup}
            onKeyDown={handleKeyDown}
          >
            Add Group
          </LoadingButton>
        </Stack>
      </Modal>
    </>
  )
}

export default AddGroup