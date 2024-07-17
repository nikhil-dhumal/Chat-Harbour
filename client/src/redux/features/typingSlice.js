import { createSlice } from "@reduxjs/toolkit"

export const typingSlice = createSlice({
  name: "Messages",
  initialState: {
    userTyping: false
  },
  reducers: {
    setTyping: (state, action) => {
      state.userTyping = action.payload
    }
  }
})

export const {
  setTyping
} = typingSlice.actions

export default typingSlice.reducer
