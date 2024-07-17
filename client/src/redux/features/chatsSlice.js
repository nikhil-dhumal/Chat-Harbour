import { createSlice } from "@reduxjs/toolkit"

export const chatsSlice = createSlice({
  name: "Chats",
  initialState: {
    chats: []
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = [...action.payload]
    },
    addChat: (state, action) => {
      state.chats = [action.payload, ...state.chats]
    }
  }
})

export const {
  setChats,
  addChat
} = chatsSlice.actions

export default chatsSlice.reducer
