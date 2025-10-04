"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {signIn} from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
    email : z.email('invaild Email').nonempty('Email Is Required'),
    password : z.string('invaild Password').nonempty('Password Is Required')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@\(!\)!%*?&]).{7,25}$/ , 'Invalid Password'),
})

type FormField = z.infer<typeof formSchema>;
export function LoginForm() {
   const searchParams = useSearchParams();
   const callbackURLParams = searchParams.get('callback-url')
   const [isLoading, setisLoading] = useState(false)

    const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  async function onSubmit(values:FormField) {
    setisLoading(true)
    const response = await signIn('credentials', {
        callbackUrl :callbackURLParams ?? '/',
        redirect : true,
        email : values.email,
        password : values.password
    });
    setisLoading(false)
    console.log(response);
    
  }

  return (
   <Card className="p-6 w-sm">
     <Form {...form}>
        {searchParams.get('error') ? <h2 className="text-destructive text-2xl">{searchParams.get('error')}</h2> : ''}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Ali@example.com"  type="email"{...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Ali@123"   type="password"{...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="cursor-pointer w-full">
            {isLoading && <Loader2 className="animate-spin"/>}Submit</Button>
           If you do not have an account, <Link className="text-blue-400 hover:text-blue-700" href={'/register'}>SignUp</Link>
           <div className="flex items-center justify-center mt-5">
            <Link  href={'forgottenpassword'}><span className="text-blue-500 hover:text-blue-900">Forgotten Password</span></Link>
           </div>
      </form>
    </Form>
   </Card>
  )
}