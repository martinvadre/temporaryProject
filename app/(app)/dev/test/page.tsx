"use client"

import { JSX, Suspense } from 'react'
import { createUser, getUser } from '@/libs/userHandler'
import { signIn } from '@/libs/auth'
import SignInWithCredencial from '@/dev/components/signInWithCredencial'
import { ContentLayout } from '@/components/panel/content-layout'

export default function TestPg(): JSX.Element {

   async function test2() {
      const res = await getUser("oangsaytv@gmail.com")
      console.log(res)
   }

   return (
    <ContentLayout title="Test">
        <div>
            <button onClick={test2}>Test</button>
        </div>
        <div>
            <SignInWithCredencial />
        </div>
    </ContentLayout>
  )
}
