import jsonwebtoken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js"
import userModel from "../models/user.model.js"

const signup = async (req, res) => {
  try {
    const { username, password, gender } = req.body

    const checkUser = await userModel.findOne({ username })
    if (checkUser) return responseHandler.badrequest(res, "Username is already in use. Please choose a different username.")

    const user = new userModel()
    user.username = username
    user.gender = gender
    user.setPassword(password)

    await user.save()

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    )

    user.password = undefined
    user.salt = undefined

    responseHandler.created(res, {
      token,
      ...user.toJSON(),
      id: user.id
    })
  } catch {
    responseHandler.error(res)
  }
}

const signin = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await userModel.findOne({ username }).select("username password salt id gender")

    if (!user) return responseHandler.badrequest(res, "User not found. Please check your username.")

    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Incorrect password. Please try again.")

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    )

    user.password = undefined
    user.salt = undefined

    responseHandler.created(res, {
      token,
      ...user.toJSON(),
      id: user.id
    })
  } catch {
    responseHandler.error(res)
  }
}

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body

    const user = await userModel.findById(req.user.id).select("password id salt")

    if (!user) return responseHandler.unauthorize(res)

    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Incorrect current password.")

    user.setPassword(newPassword)
    await user.save()

    responseHandler.ok(res)
  } catch {
    responseHandler.error(res)
  }
}

const getDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id)

    if (!user) return responseHandler.notfound(res)

    responseHandler.ok(res, user)
  } catch {
    responseHandler.error(res)
  }
}

const getUserByName = async (req, res) => {
  try {
    const { username } = req.query

    const regex = new RegExp(`^${username}`, "i")

    const users = await userModel.find({ username: regex, _id: { $ne: req.user.id }  })

    if (users.length === 0) return responseHandler.ok(res, [])

    return responseHandler.ok(res, users)
  } catch {
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
