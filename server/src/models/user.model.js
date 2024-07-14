import crypto from "crypto"
import mongoose from "mongoose"

import modelOptions from "./model.options.js"

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false  // Exclude from query results by default
  },
  salt: {
    type: String,
    required: true,
    select: false  // Exclude from query results by default
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true
  },
  blocked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: []
  }]
}, modelOptions)  // Apply predefined options for toJSON, toObject, and timestamps

// Method to set the password by generating a salt and hashing the password
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex")  // Generate a random salt
  this.password = crypto.pbkdf2Sync(
    password,        // Password to hash
    this.salt,       // Salt
    1000,            // Number of iterations
    64,              // Key length
    "sha512"         // Digest algorithm
  ).toString("hex")  // Convert the hash to a hexadecimal string
}

// Method to validate the password by hashing it and comparing it with the stored hash
userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(
    password,        // Password to hash
    this.salt,       // Salt
    1000,            // Number of iterations
    64,              // Key length
    "sha512"         // Digest algorithm
  ).toString("hex")  // Convert the hash to a hexadecimal string

  return this.password === hash  // Compare the hashed password with the stored hash
}

// Create the User model from the schema
const userModel = mongoose.model("User", userSchema)

export default userModel
