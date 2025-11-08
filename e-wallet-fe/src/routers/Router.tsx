import {createBrowserRouter} from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import path from "path"
import { Children } from "react"
import MainLayout from "../layouts/MainLayout"
import RegisterPage from "../pages/RegisterPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path:"home",
        element:<HomePage/>
      }
    ],
  },
]);