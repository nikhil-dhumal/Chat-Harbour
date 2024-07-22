import { configureStore } from "@reduxjs/toolkit"

import activeChatSlice from "./features/activeChatSlice"
import chatsSlice from "./features/chatsSlice"
import globalLoadingSlice from "./features/globalLoadingSlice"
import onlineUsersSlice from "./features/onlineUsersSlice"
import themeModeSlice from "./features/themeModeSlice"
import userSlice from "./features/userSlice"
import usersTypingSlice from "./features/usersTypingSlice"

const store = configureStore({
  reducer: {
    activeChat: activeChatSlice,
    chats: chatsSlice,
    globalLoading: globalLoadingSlice,
    onlineUsers: onlineUsersSlice,
    themeMode: themeModeSlice,
    user: userSlice,
    usersTyping: usersTypingSlice
  }
})

export default store