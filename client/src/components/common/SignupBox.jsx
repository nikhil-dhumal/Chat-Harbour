import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import { toast } from "react-toastify"

import { LoadingButton } from "@mui/lab"
import { useTheme } from "@emotion/react"
import { Alert, Box, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
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
      signupForm.handleSubmit()
    }
  }

  const signupForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    },
    onSubmit: async (values) => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)

      const { response, err } = await userApi.signUp(values)

      setIsLoginRequest(false)

      if (response) {
        signupForm.resetForm()
        dispatch(setUser(response))
        toast.success("Sign up success")
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
      onSubmit={signupForm.handleSubmit}
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
        Sign Up Here
      </Typography>
      <Stack
        gap={3}
        sx={{
          width: "60%",
          mt: 5,
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
            value={signupForm.values.username}
            onChange={signupForm.handleChange}
            error={signupForm.touched.username && signupForm.errors.username !== undefined}
            helperText={signupForm.touched.username && signupForm.errors.username}
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
            value={signupForm.values.password}
            onChange={signupForm.handleChange}
            error={signupForm.touched.password && signupForm.errors.password !== undefined}
            helperText={signupForm.touched.password && signupForm.errors.password}
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
            placeholder="confirm password"
            name="confirmPassword"
            fullWidth
            value={signupForm.values.confirmPassword}
            onChange={signupForm.handleChange}
            error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
            helperText={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={3}
        >
          <FormLabel id="gender">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="choose gender"
            name="gender"
            value={signupForm.values.gender}
            onChange={signupForm.handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
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
          sign up
        </LoadingButton>
      </Box>
      <Typography>Already have an account? <Link to="/signin" style={{ color: "#23B5D3", textDecoration: "none" }}>Sign in here</Link></Typography>
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