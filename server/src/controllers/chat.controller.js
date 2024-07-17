import responseHandler from "../handlers/response.handler.js"
import chatModel from "../models/chat.model.js"
import userModel from "../models/user.model.js"

const newChat = async (req, res) => {
  try {
    const { receiverId } = req.body

    if (receiverId === req.user.id) return responseHandler.badrequest(res, "Receiver ID must be different from user ID")

    const receiver = await userModel.findById(receiverId)
    if (!receiver) return responseHandler.badrequest(res, "Receiver does not exist")

    const existingChat = await chatModel.findOne({
      isGroup: false,
      members: { $all: [receiverId, req.user.id] }
    })

    if (existingChat) return responseHandler.ok(res, {
      isGroup: existingChat.isGroup,
      receiver,
      lastMessage: existingChat.lastMessage,
      id: existingChat._id
    })

    const chat = new chatModel()
    chat.isGroup = false
    chat.members = [req.user.id, receiverId]

    await chat.save()

    await chat
      .populate({
        path: "members",
        model: "User"
      })

    return responseHandler.created(res, {
      ...chat.toJSON(),
      receiver
    })
  } catch {
    responseHandler.error(res)
  }
}

const newGroupChat = async (req, res) => {
  try {
    const { memberIds, groupName } = req.body

    const oldChatGroup = await chatModel.findOne({ groupName })
    if (oldChatGroup) return responseHandler.badrequest(res, "Group name is already in use")

    const findUser = async (id) => {
      const user = await userModel.findById(id)
      if (!user) return null
      if (user.id === req.user.id) return "duplicate"
      return user
    }

    const members = await Promise.all(memberIds.map(id => findUser(id)))
    for (const member of members) {
      if (member === null) return responseHandler.badrequest(res, "User does not exist")
      if (member === "duplicate") return responseHandler.badrequest(res, "Group cannot contain duplicate users")
    }

    const chat = new chatModel()
    chat.isGroup = true
    chat.groupName = groupName
    chat.members = [...memberIds, req.user.id]

    await chat.save()

    await chat
      .populate({
        path: "members",
        model: "User"
      })

    await chat
      .populate({
        path: "members",
        model: "User"
      })

    return responseHandler.created(res, chat.toJSON())
  } catch {
    responseHandler.error(res)
  }
}

const getAllChats = async (req, res) => {
  try {
    const chats = await chatModel.find({
      members: { $in: [req.user.id] }
    })
      .populate({
        path: "lastMessage",
        model: "Message"
      })
      .populate({
        path: "members",
        model: "User"
      })
      .sort("-updatedAt")

    const formattedChats = chats.map(chat => {
      if (chat.isGroup) {
        return {
          isGroup: chat.isGroup,
          groupName: chat.groupName,
          lastMessage: chat.lastMessage,
          id: chat._id
        }
      }

      const receiver = chat.members.find(member => member._id.toString() !== req.user.id.toString())

      return {
        isGroup: chat.isGroup,
        receiver,
        lastMessage: chat.lastMessage,
        id: chat._id
      }
    })

    return responseHandler.ok(res, formattedChats)
  } catch (error) {
    console.error("Error fetching chats:", error)
    return responseHandler.error(res)
  }
}

const getDetails = async (req, res) => {
  try {
    const { chatId } = req.query

    const chat = await chatModel.findById(chatId)
      .populate({
        path: "messages",
        options: { sort: { createdAt: 1 } },
        populate: {
          path: "sentBy",
          model: "User"
        }
      })
      .populate({
        path: "members",
        model: "User"
      })

    if (!chat) return responseHandler.badrequest(res, "Chat not found")

    let receiver

    if (!chat.isGroup) {
      if (chat.members[0]._id.toString() === req.user.id.toString()) {
        receiver = chat.members[1]
      } else {
        receiver = chat.members[0]
      }
    }

    if (chat.isGroup) {
      return responseHandler.ok(res, chat.toJSON())
    } else {
      return responseHandler.ok(res, {
        ...chat.toJSON(),
        receiver
      })
    }
  } catch {
    responseHandler.error(res)
  }
}

export default {
  newChat,
  newGroupChat,
  getAllChats,
  getDetails
}
