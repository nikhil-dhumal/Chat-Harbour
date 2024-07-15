import express from "express"
import { body } from "express-validator"

import userController from "../controllers/user.controller.js"
import requestHandler from "../handlers/request.handler.js"
import tokenMiddleware from "../middleware/token.middleware.js"

const router = express.Router()

// Route for user signup
router.post(
  "/signup",
  // Validation for username, gender, password, and confirmPassword
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
  // Middleware to handle validation errors
  requestHandler.validate,
  // Controller function for signup
  userController.signup
)

// Route for user signin
router.post(
  "/signin",
  // Validation for username and password
  body("username")
    .exists().withMessage("Username is required")
    .isLength({ min: 8 }).withMessage("Username should be at least 8 characters long"),
  body("password")
    .exists().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password should be at least 8 characters long"),
  // Middleware to handle validation errors
  requestHandler.validate,
  // Controller function for signin
  userController.signin
)

// Route for updating user password
router.put(
  "/update-password",
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Validation for password, newPassword, and confirmNewPassword
  body("password")
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
  // Middleware to handle validation errors
  requestHandler.validate,
  // Controller function for updating password
  userController.updatePassword
)

// Route for fetching user details
router.get(
  "/details",
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Controller function for fetching user details
  userController.getDetails
)

// Route for fetching user by username
router.get(
  "/username",
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Validation for username
  body("username")
    .exists().withMessage("Username is required")
    .isLength({ min: 1 }).withMessage("Username should contain atleast one character"),
  // Middleware to handle validation errors
  requestHandler.validate,
  // Controller function for fetching user by username
  userController.getUserByName
)

// Route for blocking a user
router.get(
  '/block',
  // Middleware to verify token authenticity
  tokenMiddleware.auth,
  // Validation for userId
  body("userId")
    .exists().withMessage("ID of user to be blocked is needed"),
  // Middleware to handle validation errors
  requestHandler.validate,
  // Controller function for blocking a user
  userController.blockUser
)

export default router
