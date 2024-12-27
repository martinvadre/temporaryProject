"use client"

import { emailSignUpAction } from '@/libs/actions/actions'
import { JSX, useActionState, useEffect } from 'react'

export default function SignUpPage(): JSX.Element {
   const [response, formAction, isPending] = useActionState(emailSignUpAction, {"status": 0, "message": ""})

   useEffect(() => {
      console.log(response)
   }, [response])


   return (
      <div className="bg-white w-full max-w-[480px] p-[1.2rem]">
         <div>
            <h2 className="font-medium text-[20px] mb-[20px] text-center">Sign Up</h2>
            <form action={formAction}>
               <input className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="name" name='Name' type="text" placeholder="Name"/>
               <input className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="email" name='Email' type="email" placeholder="Email"/>
               <input className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="password" name='Password' type="password" placeholder="Password"/>
               <input className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="confirm-password" name='Confirm Password' type="password" placeholder="Confirm Password"/>
               <button className="w-full p-[10px] mt-[20px] bg-[#323232] text-white rounded-full text-[16px] cursor-pointer transition ease duration-200 hover:bg-[#000000]" type="submit">Sign Up</button>
            </form>
            <p className="font-normal text-[12px] leading-[1.5] text-[#777777] my-[20px] text-center">By clicking Sign up, I agree to Afterlearner’s <a className="text-[#323232]" href="#">Terms</a> and <a href="#">Privacy Policy</a></p>
            <p className="font-normal text-[12px] leading-[1.5] text-[#777777] my-[20px] text-center">Already have an account? <a className="text-[#323232]" href="/dev/test/auth/signin">Sign In</a></p>
         </div>
      </div>
   )
}
