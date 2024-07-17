import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { toast } from "react-toastify"

import { LoadingButton } from "@mui/lab"
import { useTheme } from "@emotion/react"
import { Alert, Box, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
import LockPersonIcon from "@mui/icons-material/LockPerson"

import userApi from "../../api/modules/user.api"

const SigninBox = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      passUpdateForm.handleSubmit()
    }
  }

  const passUpdateForm = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: async (values) => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)

      const { response, err } = await userApi.updatePassword(values)

      setIsLoginRequest(false)

      if (response) {
        passUpdateForm.resetForm()
        toast.success("Password updated successfully")
        navigate("/")
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
      onSubmit={passUpdateForm.handleSubmit}
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
        Update Password Here
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
          <LockPersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            variant="standard"
            type="password"
            placeholder="password"
            name="password"
            fullWidth
            value={passUpdateForm.values.password}
            onChange={passUpdateForm.handleChange}
            error={passUpdateForm.touched.password && passUpdateForm.errors.password !== undefined}
            helperText={passUpdateForm.touched.password && passUpdateForm.errors.password}
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
            placeholder="new password"
            name="newPassword"
            fullWidth
            value={passUpdateForm.values.newPassword}
            onChange={passUpdateForm.handleChange}
            error={passUpdateForm.touched.newPassword && passUpdateForm.errors.newPassword !== undefined}
            helperText={passUpdateForm.touched.newPassword && passUpdateForm.errors.newPassword}
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
            placeholder="confirm new password"
            name="confirmNewPassword"
            fullWidth
            value={passUpdateForm.values.confirmNewPassword}
            onChange={passUpdateForm.handleChange}
            error={passUpdateForm.touched.confirmNewPassword && passUpdateForm.errors.confirmNewPassword !== undefined}
            helperText={passUpdateForm.touched.confirmNewPassword && passUpdateForm.errors.confirmNewPassword}
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
          Update Password
        </LoadingButton>
      </Box>
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