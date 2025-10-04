import React from 'react'
import { LoginForm } from './_Component/LoginForm/LoginForm'

export default function Login() {
  return <>
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">
        Welcome Back ! 
      </h2>
      <LoginForm/>
    </div>
  </>
}
