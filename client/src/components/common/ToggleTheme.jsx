import { useDispatch, useSelector } from "react-redux"

import { IconButton } from "@mui/material"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"

import { themeModes } from "../../configs/theme.configs"

import { setThemeMode } from "../../redux/features/themeModeSlice"

const ToggleTheme = () => {
  const dispatch = useDispatch()

  const { themeMode } = useSelector((state) => state.themeMode)

  const onSwithTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
    dispatch(setThemeMode(theme))
  }

  return (
    <IconButton
      sx={{ color: "inherit" }}
      onClick={onSwithTheme}
    >
      {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
      {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
    </IconButton>
  )
}

export default ToggleTheme