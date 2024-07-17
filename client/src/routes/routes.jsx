import HomePage from "../pages/HomePage"
import PassUpdatePage from "../pages/PassUpdatePage"
import SigninPage from "../pages/SigninPage"
import SignupPage from "../pages/SignupPage"

const routes = [
    {
        index: true,
        element: <HomePage />
    },
    {
        path: "/update",
        element: <PassUpdatePage />
    },
    {
        path: "/signin",
        element: <SigninPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    }
]

export default routes