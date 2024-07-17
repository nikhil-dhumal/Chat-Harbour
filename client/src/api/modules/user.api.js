import publicClient from "../client/public.client"
import privateClient from "../client/private.client"

const userEndpoints = {
  signup: "user/signup",
  signin: "user/signin",
  updatePassword: "user/update-password",
  details: "user/details",
  getUserByName: "user/username"
}

const userApi = {
  signUp: async ({ username, password, confirmPassword, gender }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signup,
        { username, password, confirmPassword, gender }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  signIn: async ({ username, password }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signin,
        { username, password }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  updatePassword: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(
        userEndpoints.updatePassword,
        { password, newPassword, confirmNewPassword }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getDetails: async () => {
    try {
      const response = await privateClient.get(userEndpoints.details)

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getUserByName: async ({ username }) => {
    try {
      const response = await privateClient.get(
        userEndpoints.getUserByName,
        { params: { username } }
      )

      return { response }
    } catch (err) {
      return { err }
    }
  }
}

export default userApi