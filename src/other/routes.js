import Chat from "../component/Chat/chat"
import Login from "../component/Login/login"


export const publicRoutes = [
   {
      path: "/login",
      Component: Login
   }
]

export const privateRoutes = [
   {
      path: "/chat",
      Component: Chat
   }
]