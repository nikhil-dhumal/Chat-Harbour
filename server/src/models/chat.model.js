import mongoose from "mongoose"

import modelOptions from "./model.options.js"

// Define the schema for the Chat model
const chatSchema = new mongoose.Schema({
  isGroup: {
    type: Boolean,
    required: true,  // Indicates if the chat is a group chat or individual chat
  },
  groupName: {
    type: String  // Name of the group chat (if it's a group chat)
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // References to the User model
    required: true
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",  // References to the Message model
    default: []
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"  // Reference to the last message in the chat
  }
}, modelOptions)  // Apply predefined options for toJSON, toObject, and timestamps

// Create the Chat model from the schema
const chatModel = mongoose.model("Chat", chatSchema)

export default chatModel
