import jsonwebtoken from "jsonwebtoken"

import responseHandler from "../handlers/response.handler.js"
import userModel from "../models/user.model.js"

// Function to decode and verify JWT token from request headers
const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"]

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1]  // Extract the token from Authorization header
      return jsonwebtoken.verify(
        token,
        process.env.TOKEN_SECRET  // Verify token using TOKEN_SECRET from environment variables
      )
    }

    return false  // Return false if no valid token found
  } catch {
    return false  // Return false if token verification fails
  }
}

// Middleware function to authenticate user using JWT token
const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req)

  if (!tokenDecoded) return responseHandler.unauthorize(res)  // Return unauthorized response if token is invalid or missing

  try {
    const user = await userModel.findById(tokenDecoded.data)  // Find user by ID decoded from token

    if (!user) return responseHandler.unauthorize(res)  // Return unauthorized response if user not found

    req.user = user  // Attach user object to request for further use in routes

    next()
  } catch (error) {
    console.error("Error authenticating user:", error)
    return responseHandler.error(res)  // Handle server error if user lookup fails
  }
}

export default { auth, tokenDecode }
