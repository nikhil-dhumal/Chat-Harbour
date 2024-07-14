import { validationResult } from "express-validator"

// Middleware function to validate request parameters using express-validator
const validate = (req, res, next) => {
  const errors = validationResult(req)

  // If there are validation errors, respond with the first error message
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg  // Send the first error message as JSON response
    })
  }

  next()  // Proceed to the next middleware or route handler
}

export default { validate }
