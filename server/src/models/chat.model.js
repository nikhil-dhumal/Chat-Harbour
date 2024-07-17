import mongoose from "mongoose"

import modelOptions from "./model.options.js"

const chatSchema = new mongoose.Schema({
  isGroup: {
    type: Boolean,
    required: true,
  },
  groupName: {
    type: String
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: []
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }
}, modelOptions)

const chatModel = mongoose.model("Chat", chatSchema)

export default chatModel
