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
      const { chatId, message } = action.payload

      if (chatId !== state.activeChat.id) return

      state.activeChat.messages = [...state.activeChat.messages, message]
    }
  }
})

export const {
  setActiveChat,
  addMessage
} = activeChatSlice.actions

export default activeChatSlice.reducer
