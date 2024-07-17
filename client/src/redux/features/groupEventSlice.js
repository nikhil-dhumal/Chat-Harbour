import { createSlice } from "@reduxjs/toolkit"

export const groupEventSlice = createSlice({
  name: "GroupEvent",
  initialState: {
    groupEvent: false
  },
  reducers: {
    setGroupEvent: (state, action) => {
      state.groupEvent = action.payload
    }
  }
})

export const {
  setGroupEvent
} = groupEventSlice.actions

export default groupEventSlice.reducer
