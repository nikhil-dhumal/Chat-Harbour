import jsonwebtoken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js"
import userModel from "../models/user.model.js"

// Function to handle user signup
const signup = async (req, res) => {
  try {
    const { username, password, gender } = req.body

    // Check if username is already taken
    const checkUser = await userModel.findOne({ username })
    if (checkUser) return responseHandler.badrequest(res, "Username is already in use. Please choose a different username.")

    // Create a new user instance
    const user = new userModel()
    user.username = username
    user.gender = gender
    user.setPassword(password)

    // Save the user to the database
    await user.save()

    // Generate JWT token for authentication
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    )

    // Remove sensitive information from user object before sending response
    user.password = undefined
    user.salt = undefined

    // Respond with created status and user details
    responseHandler.created(res, {
      token,
      ...user.toJSON(),
      id: user.id
    })
  } catch {
    responseHandler.error(res)
  }
}

// Function to handle user signin
const signin = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find user by username and select necessary fields
    const user = await userModel.findOne({ username }).select("username password salt id gender")

    // Check if user exists
    if (!user) return responseHandler.badrequest(res, "User not found. Please check your username.")

    // Validate user password
    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Incorrect password. Please try again.")

    // Generate JWT token for authentication
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    )

    // Remove sensitive information from user object before sending response
    user.password = undefined
    user.salt = undefined

    // Respond with created status and user details
    responseHandler.created(res, {
      token,
      ...user.toJSON(),
      id: user.id
    })
  } catch {
    responseHandler.error(res)
  }
}

// Function to handle password update
const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body

    // Find user by ID and select necessary fields
    const user = await userModel.findById(req.user.id).select("password id salt")

    // Check if user exists
    if (!user) return responseHandler.unauthorize(res)

    // Validate current password
    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Incorrect current password.")

    // Set new password and save user
    user.setPassword(newPassword)
    await user.save()

    // Respond with OK status
    responseHandler.ok(res)
  } catch {
    responseHandler.error(res)
  }
}

// Function to get user details
const getDetails = async (req, res) => {
  try {
    // Find user by ID
    const user = await userModel.findById(req.user.id)

    // Check if user exists
    if (!user) return responseHandler.notfound(res)

    // Respond with OK status and user details
    responseHandler.ok(res, user)
  } catch {
    responseHandler.error(res)
  }
}

// Function to get user details by username
const getUserByName = async (req, res) => {
  try {
    const { username } = req.body

    const user = await userModel.findOne({ username })

    // Check if user exists
    if (!user) return responseHandler.ok(res, null)  // Return null if user not found
    
    // Respond with OK status and user details
    return responseHandler.ok(res, user)
  } catch {
    // Respond with error status if something goes wrong
    return responseHandler.error(res)
  }
}

export default {
  signup,
  signin,
  updatePassword,
  getDetails,
  getUserByName
}
