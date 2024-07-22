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
    },
    addMessageToChat: (state, action) => {
      const { chatId, message } = action.payload
      const chatIndex = state.chats.findIndex(chat => chat.id === chatId)

      if (chatIndex !== -1) {
        state.chats[chatIndex].messages.push(message)
        state.chats[chatIndex].lastMessage = message
        const [updatedChat] = state.chats.splice(chatIndex, 1)
        state.chats.unshift(updatedChat)
      }
    }
  }
})

export const {
  setChats,
  addChat,
  addMessageToChat
} = chatsSlice.actions

export default chatsSlice.reducer