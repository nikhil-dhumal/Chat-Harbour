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

chatSchema.methods.getReceiver = function (userId) {
  const receiver = this.members.find(member => member._id.toString() !== userId.toString())
  return receiver
}

const chatModel = mongoose.model("Chat", chatSchema)

export default chatModel
