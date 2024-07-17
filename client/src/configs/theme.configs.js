import { createTheme } from "@mui/material/styles"

export const themeModes = {
  dark: "dark",
  light: "light"
}

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette = mode === themeModes.dark ? {
      primary: {
        main: "rgb(35, 181, 211)",
        contrastText: "rgb(255, 255, 255)"
      },
      secondary: {
        main: "rgb(167, 85, 194)",
        contrastText: "rgb(255, 255, 255)"
      },
      background: {
        default: "rgb(35, 35, 35)"
      }
    } : {
      primary: {
        main: "rgb(35, 181, 211)",
      },
      secondary: {
        main: "rgb(167, 85, 194)",
      },
      background: {
        default: "rgb(180, 201, 189)"
      }
    }

    return createTheme({
      palette: {
        mode,
        ...customPalette
      },
      components: {
        MuiButton: {
          defaultProps: {
            disableRipple: true
          },
          styleOverrides: {
            root: {
              backgroundImage: "linear-gradient(to right, #23B5D3, #A755C2)",
              borderRadius: "5px",
              color: "#ffffff"
            }
          }
        }
      }
    })
  }
}

export default themeConfigs