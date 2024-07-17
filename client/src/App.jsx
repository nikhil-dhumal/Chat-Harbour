import { useSelector } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import MainLayout from "./components/layout/MainLayout"

import themeConfigs from "./configs/theme.configs"

import routes from "./routes/routes"

import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode)

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />

      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {
              routes.map((route, index) => (
                route.index ? (
                  <Route 
                    index
                    key={index}
                    element={route.element}
                  />
                ) : (
                  <Route
                    path={route.path}
                    key={index}
                    element={route.element}
                  />
                )
              ))
            }
          </Route>
        </Routes>
      </BrowserRouter>

    </ThemeProvider>
  )
}

export default App