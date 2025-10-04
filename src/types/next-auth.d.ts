import { UserResponse } from "@/interfaces/login"
import  { User } from "next-auth"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user : UserResponse
    
  }
  interface User {
    user : UserResponse 
    token : string
  }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT extends User {}
}