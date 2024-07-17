import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import { toast } from "react-toastify"

import { LoadingButton } from "@mui/lab"
import { useTheme } from "@emotion/react"
import { Alert, Box, Stack, TextField, Typography } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LockPersonIcon from "@mui/icons-material/LockPerson"

import userApi from "../../api/modules/user.api"

import { setUser } from "../../redux/features/userSlice"

const SigninBox = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      signinForm.handleSubmit()
    }
  }

  const signinForm = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: async (values) => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)

      const { response, err } = await userApi.signIn(values)

      setIsLoginRequest(false)

      if (response) {
        signinForm.resetForm()
        dispatch(setUser(response))
        toast.success("Sign in success")
      }

      if (err) setErrorMessage(err.message)
    }
  })

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        flex: 3,
        p: 5,
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px"
      }}
      component="form"
      onSubmit={signinForm.handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "500",
          background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text"
        }}
      >
        Sign In Here
      </Typography>
      <Stack
        gap={3}
        sx={{
          width: "60%",
          mt: 10,
          pr: 1
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-end"
        >
          <AccountCircleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            variant="standard"
            type="text"
            placeholder="username"
            name="username"
            fullWidth
            value={signinForm.values.username}
            onChange={signinForm.handleChange}
            error={signinForm.touched.username && signinForm.errors.username !== undefined}
            helperText={signinForm.touched.username && signinForm.errors.username}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="flex-end"
        >
          <LockPersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            variant="standard"
            type="password"
            placeholder="password"
            name="password"
            fullWidth
            value={signinForm.values.password}
            onChange={signinForm.handleChange}
            error={signinForm.touched.password && signinForm.errors.password !== undefined}
            helperText={signinForm.touched.password && signinForm.errors.password}
          />
        </Stack>
      </Stack>
      <Box
        sx={{
          width: "60%",
          mb: 3
        }}
      >
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 4 }}
          loading={isLoginRequest}
        >
          sign in
        </LoadingButton>
      </Box>
      <Typography>Don"t have an account yet? <Link to="/signup" style={{ color: "#23B5D3", textDecoration: "none" }}>Sign up here</Link></Typography>
      {
        errorMessage && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
          </Box>
        )
      }
    </Stack>
  )
}

export default SigninBox