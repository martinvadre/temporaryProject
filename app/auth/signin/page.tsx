import { JSX } from 'react'
import SignInWithCredencial from '@/components/auth/signInWithCredencial'

export default function SignInPG(): JSX.Element {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignInWithCredencial/>
   </div>
  )
}
