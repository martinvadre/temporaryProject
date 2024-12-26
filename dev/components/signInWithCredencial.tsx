import { emailSignInAction, googleSignInAction } from '@/libs/actions/actions'
import React from 'react'

export default function SignInWithCredencial() {

   return (
      <div className='className="mx-auto p-6 bg-white rounded-lg shadow-md max-h-full max-w-fit"'>
         <form action={emailSignInAction} >
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In (TEST)</h2>
            <div className="mb-4 flex flex-col">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
               </label>
               <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name='email'
               />
            </div>
            <div className="mb-6 flex flex-col">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
               </label>
               <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  name='password'
               />
            </div>
            <div className="flex items-center justify-between">
               <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
               >
                  Sign In
               </button>
            </div>
            <div className="flex items-center justify-center my-4">
               <span className="text-gray-500">or</span>
            </div>
            <div className="mt-4 flex items-center justify-center">
         </div>
         </form>
         <form action={googleSignInAction}>
            <button
               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="submit"
            >
               Sign In with Google
            </button>
         </form>
      </div>
   )
}
