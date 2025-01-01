import { emailSignInAction, googleSignInAction } from '@/libs/actions/actions'
import Link from 'next/link'
import React from 'react'

export default function SignInWithCredencial() {

   return (
      <div className="bg-white w-full max-w-[480px] p-[1.2rem] justify-center items-center">
         <h2 className="font-medium text-[20px] mb-[20px] text-center">Login</h2>
         <form action={googleSignInAction}>
            <button className="w-full py-2 border border-[#cecece] text-[#777777] rounded-full text-lg cursor-pointer transition ease duration-250 hover:border-[#323232] hover:text-[#323232]" type="submit">Contiue with Google</button>
         </form>
         <div className="font-normal text-[12px] leading-[1.5] text-[#777777] my-[7px] text-center">or</div>
         <form action={emailSignInAction}>
               <input className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="email" type="email" placeholder="Email" name='email'/>
               <input className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="password" type="password" placeholder="Password" name='password'/>
               <button className="w-full p-[10px] mt-[20px] bg-[#323232] text-white rounded-full text-[16px] cursor-pointer transition ease duration-250 hover:bg-[#000000]" type="submit">Sign In</button>
         </form>
         <p className="font-normal text-[12px] leading-[1.5] text-[#777777] mt-[20px] text-center">New user? <Link className="text-[#323232]" href="/auth/signup">Sign up</Link></p>
      </div>
   )
}
