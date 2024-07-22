import responseHandler from "../handlers/response.handler.js"

import chatModel from "../models/chat.model.js"
import userModel from "../models/user.model.js"

const newChat = async (req, res) => {
  try {
    const { receiverId } = req.body

    if (receiverId === req.user.id) {
      return responseHandler.badrequest(res, "Receiver ID must be different from user ID")
    }

    const receiver = await userModel.findById(receiverId)
    if (!receiver) {
      return responseHandler.badrequest(res, "Receiver does not exist")
    }

    const existingChat = await chatModel.findOne({
      isGroup: false,
      members: { $all: [receiverId, req.user.id] }
    }).populate({
      path: "messages",
      model: "Message",
      options: { sort: { createdAt: 1 } },
      populate: {
        path: "sentBy",
        model: "User"
      }
    })

    if (existingChat) {
      return responseHandler.ok(res, {
        ...existingChat.toJSON(),
        receiver
      })
    }

    const chat = new chatModel({
      isGroup: false,
      members: [req.user.id, receiverId]
    })

    await chat.save()

    return responseHandler.created(res, {
      ...chat.toJSON(),
      receiver
    })
  } catch (error) {
    console.error("Error creating new chat:", error)
    responseHandler.error(res)
  }
}

const newGroupChat = async (req, res) => {
  try {
    const { memberIds, groupName } = req.body

    const oldChatGroup = await chatModel.findOne({ groupName })
    if (oldChatGroup) {
      return responseHandler.badrequest(res, "Group name is already in use")
    }

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

    const chat = new chatModel({
      isGroup: true,
      groupName,
      members: [...memberIds, req.user.id],
    })

    await chat.save()

    await chat.populate({
      path: "members",
      model: "User"
    })

    return responseHandler.created(res, chat.toJSON())
  } catch (error) {
    console.error("Error creating new group chat:", error)
    responseHandler.error(res)
  }
}

const getAllChats = async (req, res) => {
  try {
    const chats = await chatModel.find({
      members: { $in: [req.user.id] }
    })
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
      .populate({
        path: "lastMessage",
        model: "Message"
      })
      .sort("-updatedAt")

    const formattedChats = await Promise.all(chats.map(async (chat) => {
      if (chat.isGroup) {
        return chat.toJSON()
      } else {
        return {
          ...chat.toJSON(),
          receiver: chat.getReceiver(req.user.id)
        }
      }
    }))

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
      .populate({
        path: "lastMessage",
        model: "Message"
      })

    if (!chat) {
      return responseHandler.badrequest(res, "Chat not found")
    }

    if (chat.isGroup) {
      return responseHandler.ok(res, chat.toJSON())
    } else {
      return responseHandler.ok(res, {
        ...chat.toJSON(),
        receiver: chat.getReceiver(req.user.id)
      })
    }
  } catch (error) {
    console.error("Error fetching chat details:", error)
    responseHandler.error(res)
  }
}

export default {
  newChat,
  newGroupChat,
  getAllChats,
  getDetails
}
