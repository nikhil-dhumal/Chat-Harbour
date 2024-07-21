import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import { SocketProvider } from "./contexts/SocketContext.jsx"

import store from "./redux/store"

import App from "./App.jsx"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <SocketProvider>
      <App />
    </SocketProvider>
  </Provider>
  // </React.StrictMode>
)
