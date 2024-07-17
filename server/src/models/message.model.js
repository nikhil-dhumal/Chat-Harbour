import mongoose from "mongoose"

import modelOptions from "./model.options.js"

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, modelOptions)

const messageModel = mongoose.model("Message", messageSchema)

export default messageModel
