const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data)

// Function to handle generic server errors
const error = (res) => responseWithData(res, 500, {
  status: 500,
  message: "Oops! Something went wrong!"
})

// Function to handle bad requests with a custom message
const badrequest = (res, message) => responseWithData(res, 400, {
  status: 400,
  message
})

// Function to handle successful responses with data
const ok = (res, data) => responseWithData(res, 200, data)

// Function to handle successful creation responses with data
const created = (res, data) => responseWithData(res, 201, data)

// Function to handle unauthorized access responses
const unauthorize = (res) => responseWithData(res, 401, {
  status: 401,
  message: "Unauthorized"
})

// Function to handle resource not found responses
const notfound = (res) => responseWithData(res, 404, {
  status: 404,
  message: "Resource not found"
})

export default {
  error,
  badrequest,
  ok,
  created,
  unauthorize,
  notfound
}
