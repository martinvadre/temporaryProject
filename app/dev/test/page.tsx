"use client"

import { JSX, Suspense } from 'react'
import { createUser, getUser } from '@/libs/userHandler'
import { signIn } from '@/libs/auth'
import SignInWithCredencial from '@/dev/components/signInWithCredencial'

export default function TestPg(): JSX.Element {

   async function test2() {
      const res = await getUser("oangsaytv@gmail.com")
      console.log(res)
   }

   return (
    <div>
      <h1>Test Page</h1>
      <button className="border w-max h-[45px] rounded bg-pink-500 text-white" onClick={test2}>
         Press me daddy 😏
      </button>
      <div>
         <SignInWithCredencial/>
      </div>
    </div>
  )
}
