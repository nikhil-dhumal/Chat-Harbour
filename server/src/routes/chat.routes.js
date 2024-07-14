import express from "express"
import { body } from "express-validator"

import chatController from "../controllers/chat.controller.js"
import requestHandler from "../handlers/request.handler.js"
import tokenMiddleware from "../middleware/token.middleware.js"

const router = express.Router()

// Route for starting a new chat
router.post(
  "/",
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Validation for receiverId
  body("receiverId")
    .exists().withMessage("Receiver ID is required"),
  // Middleware to handle validation errors
  requestHandler.validate,
  // Controller function for creating a new chat
  chatController.newChat
)

// Route for starting a new group chat
router.post(
  "/group",
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Validation for groupName and memberIds
  body("groupName")
    .exists().withMessage("Group name is required")
    .isLength({ min: 5 }).withMessage("Group name should be at least 5 characters long"),
  body("memberIds")
    .exists().withMessage("Member IDs are required")
    .isArray({ min: 1, max: 29 }).withMessage("Members should be between 2 and 30 for a group"),
  // Middleware to handle validation errors
  requestHandler.validate,
  // Controller function for creating a new group chat
  chatController.newGroupChat
)

// Route for fetching all individual chats of the logged-in user
router.get(
  "/all",
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Controller function for fetching all individual chats
  chatController.getAllChats
)

// Route for fetching all group chats of the logged-in user
router.get(
  "/all-groups",
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Controller function for fetching all group chats
  chatController.getAllGroupChats
)

// Route for fetching chat details by chatId
router.get(
  "/details",
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Validation for chatId
  body("chatId")
    .exists().withMessage("Chat ID is required"),
  // Middleware to handle validation errors
  requestHandler.validate,
  // Controller function for fetching chat details
  chatController.getDetails
)

// Route for fetching chat details with a specific user by receiverId
router.get(
  "/",
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Validation for receiverId
  body("receiverId")
    .exists().withMessage("Receiver ID is required"),
  // Middleware to handle validation errors
  requestHandler.validate,
  // Controller function for fetching chat details with a specific user
  chatController.getChat
)

export default router
