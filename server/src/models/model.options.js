const modelOptions = {
  toJSON: {
    virtuals: true, // Include virtuals when converting to JSON
    // Customize the transformation of the output object
    transform: (_, obj) => {
      delete obj._id  // Remove the _id field from the output
      return obj      // Return the transformed object
    }
  },
  toObject: {
    virtuals: true, // Include virtuals when converting to a plain object
    // Customize the transformation of the output object
    transform: (_, obj) => {
      delete obj._id  // Remove the _id field from the output
      return obj      // Return the transformed object
    }
  },
  timestamps: true // Add createdAt and updatedAt timestamps
}

export default modelOptions
