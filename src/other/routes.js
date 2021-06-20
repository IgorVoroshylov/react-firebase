import Main from "../component/Main/main"
import Login from "../component/Login/login"
import Navbar from "../component/Navbar/navbar"


export const publicRoutes = [
   {
      path: "/login",
      Component: Login
   }
]

export const privateRoutes = [
   {
      path: "/main",
      Component: Main
   }
]