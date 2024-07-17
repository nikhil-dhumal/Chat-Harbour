import privateClient from "../client/private.client"

const chatEndpoints = {
  newChat: "/chat",
  newChatGroup: "/chat/group",
  allChats: "/chat/all",
  details: "/chat/"
}

const chatApi = {
  newChat: async ({ receiverId }) => {
    try {
      const response = await privateClient.post(
        chatEndpoints.newChat,
        { receiverId }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  newGroupChat: async ({ groupName, memberIds }) => {
    try {
      const response = await privateClient.post(
        chatEndpoints.newChatGroup,
        { groupName, memberIds }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  allChats: async () => {
    try {
      const response = await privateClient.get(chatEndpoints.allChats)

      return { response }
    } catch (err) {
      return { err }
    }
  },
  details: async ({ chatId }) => {
    try {
      const response = await privateClient.get(
        chatEndpoints.details,
        { params: { chatId } }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  }
}

export default chatApi