import { createSlice } from "@reduxjs/toolkit"

export const onlineUsersSlice = createSlice({
  name: "OnlineUsers",
  initialState: {
    onlineUsers: []
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = [...action.payload]
    },
    addUser: (state, action) => {
      const newUser = action.payload
      if (!state.onlineUsers.find((user) => user === newUser)) {
        state.onlineUsers.push(newUser)
      }
    },
    removeUser: (state, action) => {
      const offlineUser = action.payload
      state.onlineUsers = state.onlineUsers.filter((user) => user !== offlineUser)
    }
  }
})

export const {
  setOnlineUsers,
  addUser,
  removeUser
} = onlineUsersSlice.actions

export default onlineUsersSlice.reducer
