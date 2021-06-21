import Main from "../Main/main"
import Login from "../Login/login"


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