import privateClient from "../client/private.client"

const chatEndpoints = {
  newChat: "/chat",
  newChatGroup: "/chat/group",
  allChats: "/chat/all",
  allChatGroups: "/chat/all-groups",
  details: "/chat/details",
  dmDetails: "/chat"
}

const chatApi = {
  newChat: async ({ receiverID }) => {
    try {
      const response = await privateClient.post(
        chatEndpoints.newChat,
        { receiverID }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  newChat: async ({ groupName, memberIds}) => {
    try {
      const response = await privateClient.post(
        chatEndpoints.newChatGroup,
        { groupName, memberIds}
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
  allChatGroups: async () => {
    try {
      const response = await privateClient.get(chatEndpoints.allChatGroups)

      return { response }
    } catch (err) {
      return { err }
    }
  },
  details: async ({ chatId }) => {
    try {
      const response = await privateClient.get(
        chatEndpoints.details,
        { chatId }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getUserByName: async ({ username }) => {
    try {
      const response = await privateClient.get(
        chatEndpoints.getUserByName,
        { username }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  }
}

export default chatApi