import { signIn } from 'next-auth/react'
import React, { JSX } from 'react'
import { googleSignInAction } from '../../libs/actions/actions'

export default function GoogleSignInBtn() {

   return (
      <form action={googleSignInAction}>
         <button type="submit" className='border w-max h-[45px] rounded bg-blue-500 text-white'>Login with Google</button>
      </form>
   )
}
