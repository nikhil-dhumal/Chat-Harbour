import responseHandler from "../handlers/response.handler.js"
import chatModel from "../models/chat.model.js"
import userModel from "../models/user.model.js"

// Function to create a new one-on-one chat
const newChat = async (req, res) => {
  try {
    const { receiverId } = req.body

    // Check if receiverId is the same as the logged-in user's ID
    if (receiverId === req.user.id) return responseHandler.badrequest(res, "Receiver ID must be different from user ID")

    // Check if receiver exists
    const receiver = await userModel.findById(receiverId)
    if (!receiver) return responseHandler.badrequest(res, "Receiver does not exist")

    // Check if a chat between the current user and receiver already exists
    const existingChat = await chatModel.findOne({
      isGroup: false,
      members: { $all: [receiverId, req.user.id] }
    })

    // If chat already exists, return its details
    if (existingChat) return responseHandler.ok(res, existingChat.toJSON())

    // Create a new chat instance
    const chat = new chatModel()
    chat.isGroup = false
    chat.members = [req.user.id, receiverId]

    // Save the new chat to the database
    await chat.save()

    // Respond with created status and chat details
    return responseHandler.created(res, chat.toJSON())
  } catch {
    responseHandler.error(res)
  }
}

// Function to create a new group chat
const newGroupChat = async (req, res) => {
  try {
    const { memberIds, groupName } = req.body

    // Check if a group chat with the same group name already exists
    const oldChatGroup = await chatModel.findOne({ groupName })
    if (oldChatGroup) return responseHandler.badrequest(res, "Group name is already in use")

    // Function to find user by ID asynchronously
    const findUser = async (id) => {
      const user = await userModel.findById(id)
      if (!user) return null
      if (user.id === req.user.id) return "duplicate"  // Prevent adding the same user multiple times to the group
      return user
    }

    // Check existence and uniqueness of each member
    const members = await Promise.all(memberIds.map(id => findUser(id)))
    for (const member of members) {
      if (member === null) return responseHandler.badrequest(res, "User does not exist")
      if (member === "duplicate") return responseHandler.badrequest(res, "Group cannot contain duplicate users")
    }

    // Create a new group chat instance
    const chat = new chatModel()
    chat.isGroup = true
    chat.groupName = groupName
    chat.members = [...memberIds, req.user.id]

    // Save the new group chat to the database
    await chat.save()

    // Respond with created status and group chat details
    return responseHandler.created(res, {
      ...chat.toJSON()
    })
  } catch {
    responseHandler.error(res)
  }
}

// Function to get all one-on-one chats for the logged-in user
const getAllChats = async (req, res) => {
  try {
    // Find all one-on-one chats where the logged-in user is a member
    const chats = await chatModel.find({
      isGroup: false,
      members: { $in: [req.user.id] }
    })
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "sentBy",
          model: "User"
        }
      })
      .populate({
        path: "members",
        model: "User"
      })

    // Respond with OK status and list of one-on-one chats
    return responseHandler.ok(res, chats)
  } catch {
    responseHandler.error(res)
  }
}

// Function to get all group chats for the logged-in user
const getAllGroupChats = async (req, res) => {
  try {
    // Find all group chats where the logged-in user is a member
    const groupChats = await chatModel.find({
      isGroup: true,
      members: { $in: [req.user.id] }
    })
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "sentBy",
          model: "User"
        }
      })
      .populate({
        path: "members",
        model: "User"
      })

    // Respond with OK status and list of group chats
    return responseHandler.ok(res, groupChats)
  } catch {
    responseHandler.error(res)
  }
}

// Function to get detailed information about a specific chat
const getDetails = async (req, res) => {
  try {
    const { chatId } = req.body

    // Find chat by ID and populate with messages and member details
    const chat = await chatModel.findById(chatId)
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "sentBy",
          model: "User"
        }
      })
      .populate({
        path: "members",
        model: "User"
      })

    // Return error if chat does not exist
    if (!chat) return responseHandler.badrequest(res, "Chat not found")

    // Respond with OK status and chat details
    return responseHandler.ok(res, chat)
  } catch {
    responseHandler.error(res)
  }
}

// Function to get one-on-one chat details between the logged-in user and another user
const getChat = async (req, res) => {
  try {
    const { receiverId } = req.body

    // Check if receiverId is the same as the logged-in user's ID
    if (receiverId === req.user.id) return responseHandler.badrequest(res, "Receiver ID must be different from user ID")

    // Find receiver by ID
    const receiver = await userModel.findById(receiverId)
    if (!receiver) return responseHandler.badrequest("User does not exist")

    // Find one-on-one chat between logged-in user and receiver, populate with messages and member details
    const chat = await chatModel.findOne({
      isGroup: false,
      members: { $all: [req.user.id, receiverId] }
    })
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "sentBy",
          model: "User"
        }
      })
      .populate({
        path: "members",
        model: "User"
      })

    // Return error if chat does not exist
    if (!chat) return responseHandler.badrequest(res, "Chat does not exist")

    // Respond with OK status and chat details
    return responseHandler.ok(res, chat)
  } catch {
    responseHandler.error(res)
  }
}

export default {
  newChat,
  newGroupChat,
  getAllChats,
  getAllGroupChats,
  getDetails,
  getChat
}
