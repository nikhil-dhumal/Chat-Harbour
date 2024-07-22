import { createSlice } from "@reduxjs/toolkit"

export const userTypingSlice = createSlice({
  name: "UsersTyping",
  initialState: {
    usersTyping: {}
  },
  reducers: {
    addUserTyping: (state, action) => {
      const { userId, chatId } = action.payload

      if (!state.usersTyping[chatId]) {
        state.usersTyping[chatId] = [userId]
      } else if (!state.usersTyping[chatId].includes(userId)) {
        state.usersTyping[chatId].push(userId)
      }
    },
    removeUserTyping: (state, action) => {
      const { userId, chatId } = action.payload

      if (state.usersTyping[chatId]) {
        state.usersTyping[chatId] = state.usersTyping[chatId].filter(id => id !== userId)

        if (state.usersTyping[chatId].length === 0) {
          delete state.usersTyping[chatId]
        }
      }
    }
  }
})

export const {
  addUserTyping,
  removeUserTyping
} = userTypingSlice.actions

export default userTypingSlice.reducer
