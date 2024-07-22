import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { toast } from "react-toastify"

import { LoadingButton } from "@mui/lab"
import { useTheme } from "@emotion/react"
import { Alert, Box, Stack, TextField, Typography } from "@mui/material"
import LockPersonIcon from "@mui/icons-material/LockPerson"

import userApi from "../../api/modules/user.api"

const SigninBox = () => {
  const theme = useTheme()

  const navigate = useNavigate()

  const [updateResquested, setUpdateRequested] = useState(false)
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
      setUpdateRequested(true)

      const { response, err } = await userApi.updatePassword(values)

      setUpdateRequested(false)

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
        flex: { xs: 1, sm: 3 },
        p: { xs: 0, sm: 5 },
        borderTopRightRadius: { xs: 0, md: "10px" },
        borderBottomRightRadius: { xs: 0, md: "10px" }
      }}
      component="form"
      onSubmit={passUpdateForm.handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <Typography
        sx={{
          fontWeight: "500",
          background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
          fontSize: { xs: "1.7rem", sm: "2.5rem"}
        }}
      >
        Update Password Here
      </Typography>
      <Stack
        gap={3}
        sx={{
          width: { xs: "80%", lg: "60%" },
          mt: { xs: 3, sm: 5, md: 10 },
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
          width: { xs: "80%", lg: "60%" },
          mb: 3
        }}
      >
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 4 }}
          loading={updateResquested}
        >
          Update Password
        </LoadingButton>
      </Box>
      {
        errorMessage && (
          <Box
            sx={{
              mt: { xs: 1, sm: 2 },
              width: { xs: "80%", lg: "100%" }
            }}
          >
            <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
          </Box>
        )
      }
    </Stack>
  )
}

export default SigninBox