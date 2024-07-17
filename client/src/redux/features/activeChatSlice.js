import { createSlice } from "@reduxjs/toolkit"

export const activeChatSlice = createSlice({
  name: "ActiveChat",
  initialState: {
    activeChat: null
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload
    },
    addMessage: (state, action) => {
      state.activeChat.messages = [...state.activeChat.messages, action.payload]
    }
  }
})

export const {
  setActiveChat,
  addMessage
} = activeChatSlice.actions

export default activeChatSlice.reducer
