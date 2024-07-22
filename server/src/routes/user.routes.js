import express from "express"
import { body, query } from "express-validator"

import userController from "../controllers/user.controller.js"
import requestHandler from "../handlers/request.handler.js"
import tokenMiddleware from "../middleware/token.middleware.js"

const router = express.Router()

router.post(
  "/signup",
  body("username")
    .exists().withMessage("Username is required")
    .isLength({ min: 8 }).withMessage("Username should be at least 8 characters long"),
  body("gender")
    .exists().withMessage("Gender is required"),
  body("password")
    .exists().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password should be at least 8 characters long"),
  body("confirmPassword")
    .exists().withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm password should match password")
      }
      return true
    }),
  body("gender")
    .custom((value) => {
      if (value !== "male" && value !== "female") {
        throw new Error("Gender must be either male' or 'female'")
      }
      return true
    }),
  requestHandler.validate,
  userController.signup
)

router.post(
  "/signin",
  body("username")
    .exists().withMessage("Username is required")
    .isLength({ min: 8 }).withMessage("Username should be at least 8 characters long"),
  body("password")
    .exists().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password should be at least 8 characters long"),
  requestHandler.validate,
  userController.signin
)

router.put(
  "/update-password", tokenMiddleware.auth, body("password")
    .exists().withMessage("Current password is required")
    .isLength({ min: 8 }).withMessage("Current password should be at least 8 characters long"),
  body("newPassword")
    .exists().withMessage("New password is required")
    .isLength({ min: 8 }).withMessage("New password should be at least 8 characters long"),
  body("confirmNewPassword")
    .exists().withMessage("Confirm new password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Confirm new password should match new password")
      }
      return true
    }),
  requestHandler.validate,
  userController.updatePassword
)

router.get(
  "/details",
  tokenMiddleware.auth,
  userController.getDetails
)

router.get(
  "/username",
  tokenMiddleware.auth,
  query("username")
    .exists().withMessage("Username is required"),
  requestHandler.validate,
  userController.getUserByName
)

export default router
