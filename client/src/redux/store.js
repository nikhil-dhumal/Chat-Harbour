import { configureStore } from "@reduxjs/toolkit"

import activeChatSlice from "./features/activeChatSlice"
import chatsSlice from "./features/chatsSlice"
import globalLoadingSlice from "./features/globalLoadingSlice"
import groupEventSLice from "./features/groupEventSlice"
import themeModeSlice from "./features/themeModeSlice"
import userSlice from "./features/userSlice"

const store = configureStore({
  reducer: {
    activeChat: activeChatSlice,
    chats: chatsSlice,
    globalLoading: globalLoadingSlice,
    groupEvent: groupEventSLice,
    themeMode: themeModeSlice,
    user: userSlice
  }
})

export default store