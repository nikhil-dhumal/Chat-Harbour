import express from "express"
import { body, query } from "express-validator"

import chatController from "../controllers/chat.controller.js"
import requestHandler from "../handlers/request.handler.js"
import tokenMiddleware from "../middleware/token.middleware.js"

const router = express.Router()

router.post(
  "/",
  tokenMiddleware.auth,
  body("receiverId")
    .exists().withMessage("Receiver ID is required"),
  requestHandler.validate,
  chatController.newChat
)

router.post(
  "/group",
  tokenMiddleware.auth,
  body("groupName")
    .exists().withMessage("Group name is required")
    .isLength({ min: 5 }).withMessage("Group name should be at least 5 characters long"),
  body("memberIds")
    .exists().withMessage("Member IDs are required")
    .isArray({ min: 2, max: 29 }).withMessage("Members should be between 3 and 30 for a group"),
  requestHandler.validate,
  chatController.newGroupChat
)

router.get(
  "/all",
  tokenMiddleware.auth,
  chatController.getAllChats
)

router.get(
  "/",
  tokenMiddleware.auth,
  query("chatId")
    .exists().withMessage("Chat ID is required"),
  requestHandler.validate,
  chatController.getDetails
)

export default router
