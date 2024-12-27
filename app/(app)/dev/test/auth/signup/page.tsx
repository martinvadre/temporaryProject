"use client"

import { emailSignUpAction } from '@/libs/actions/actions'
import { JSX, useActionState, useEffect } from 'react'

export default function SignUpPage(): JSX.Element {
   const [response, formAction, isPending] = useActionState(emailSignUpAction, {"status": 0, "message": ""})

   useEffect(() => {
      console.log(response)
   }, [response])


   return (
      <div>
         <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form action={formAction}>
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                     Name
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="name"
                     name='name'
                     type="text"
                     placeholder="Name"
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                     Email
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="email"
                     name='email'
                     type="email"
                     placeholder="Email"
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                     Password
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="password"
                     name='password'
                     type="password"
                     placeholder="Password"
                  />
               </div>
               <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                     Confirm Password
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="confirm-password"
                     name='confirm-password'
                     type="password"
                     placeholder="Confirm Password"
                  />
               </div>
               <div className="flex items-center justify-between">
                  <button
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="submit"
                  >
                     Sign Up
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}
