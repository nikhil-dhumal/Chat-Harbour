import mongoose from "mongoose"

import modelOptions from "./model.options.js"

// Define the schema for the Message model
const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true  // Content of the message
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",    // Reference to the User model indicating who sent the message
    required: true  // Sender of the message is required
  }
}, modelOptions)  // Apply predefined options for toJSON, toObject, and timestamps

// Create the Message model from the schema
const messageModel = mongoose.model("Message", messageSchema)

export default messageModel
