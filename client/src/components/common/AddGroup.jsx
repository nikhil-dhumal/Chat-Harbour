import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { LoadingButton } from "@mui/lab"
import { Autocomplete, Box, Chip, IconButton, Modal, Stack, TextField } from "@mui/material"
import GroupAddIcon from "@mui/icons-material/GroupAdd"

import userApi from "../../api/modules/user.api"
import chatApi from "../../api/modules/chat.api"

import { useSocket } from "../../contexts/SocketContext"

import { setActiveChat } from "../../redux/features/activeChatSlice"
import { addChat } from "../../redux/features/chatsSlice"

const AddGroup = () => {
  const dispatch = useDispatch()

  const { sendNewChat } = useSocket()
  
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

  const handleGroupMembers = (event, value) => {
    setGroupMembers(value)
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
    const memberIds = groupMembers.map((user) => user.id)
    const { response, err } = await chatApi.newGroupChat({ groupName, memberIds })
    if (response) {
      toast.success(`${groupName} created successfully`)
      dispatch(setActiveChat(response))
      dispatch(addChat(response))
      sendNewChat(response.id, null)
    }
    if (err) toast.error(err.message)
    setIsAddGroupRequest(false)
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
            width: { xs: "90%", md: "40%" },
            height: "max-content",
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
          <Autocomplete 
            multiple
            options={users}
            getOptionLabel={(option) => option.username}
            value={groupMembers}
            onChange={handleGroupMembers}
            sx={{
              width: "100%",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select usernames"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option.username} {...getTagProps({ index })} />
              ))
            }
          />
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
