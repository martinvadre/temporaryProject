"use client"

import { JSX, Suspense } from 'react'
import { createUser, getUser } from '@/libs/userHandler'
import { signIn } from '@/libs/auth'
import SignInWithCredencial from '@/components/auth/signInWithCredencial'

export default function TestPg(): JSX.Element {

   async function test2() {
      const res = await getUser("oangsaytv@gmail.com")
      console.log(res)
   }

   return (
    <div>
        <div>
            <button onClick={test2}>Test</button>
        </div>
        <div>
            <SignInWithCredencial />
        </div>
    </div>
  )
}
