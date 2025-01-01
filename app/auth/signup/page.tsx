"use client"

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { emailSignUpAction } from '@/libs/actions/actions'
import { JSX, useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signUpSchema } from '@/libs/schemas/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormAction } from '@/libs/hooks/useFormAction'
import CButton from '@/components/customUI/button'
import Link from 'next/link'

interface PasswordErrorState {
    isUpper: boolean
    isLower: boolean
    isSpecial: boolean
    isNumber: boolean
    isLong: boolean
    isError: boolean
    password: string
 }

export default function SignUpPage(): JSX.Element {
    const [response, formAction, isPending] = useActionState(emailSignUpAction, {"status": 0, "message": ""})
    const [passwordError, setPasswordError] = useState<PasswordErrorState>({isUpper: true, isLower: true, isSpecial: true, isNumber: true, isError: true, isLong: true, password: ""})
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")


    const passwordValidation = (password: string): void => {
        const specialChars = '@$!%*?&.';
        const upper = /\p{Lu}/u
        const lower = /\p{Ll}/u
        const number = /\d/

        setPasswordError({
           isUpper: upper.test(password) && password != "",
           isLower: lower.test(password) && password != "",
           isSpecial: specialChars.split('').some(char => password.includes(char)) && password != "",
           isNumber: number.test(password) && password != "",
           isLong: password.length >= 8 && password != "",
           isError: !(upper.test(password) && lower.test(password) && specialChars.split('').some(char => password.includes(char)) && number.test(password) && password != ""),
           password: password
        })
     }

    const form = useFormAction<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    })

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "password") {
                passwordValidation(value.password as string);
                setPassword(value.password as string);
            }
            if (name === "confirm_password") {
                setConfirmPassword(value.confirm_password as string);
            }
        });
        return () => subscription.unsubscribe();
    }, [form]);

    // Old style
    //    return (
    //       <div className="bg-white w-full max-w-[480px] p-[1.2rem]">
    //          <h2 className="font-medium text-[20px] mb-[20px] text-center">Sign Up</h2>
    //          <form action={formAction}>
    //             <input className="font-inter w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="name" name='Name' type="text" placeholder="Name"/>
    //             <input className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="email" name='Email' type="email" placeholder="Email"/>
    //             <input className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="password" name='Password' type="password" placeholder="Password"/>
    //             <input className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="confirm-password" name='Confirm Password' type="password" placeholder="Confirm Password"/>
    //             <button className="w-full p-[10px] mt-[20px] bg-[#323232] text-white rounded-full text-[16px] cursor-pointer transition ease duration-250 hover:bg-[#000000]" type="submit">Sign Up</button>
    //          </form>
    //          <p className="font-normal text-[12px] text-[#777777] mt-[20px] text-center">By clicking Sign up, I agree to iNeng's <a className="text-[#323232]" href="#">Terms</a> and <a className="text-[#323232]" href="#">Privacy Policy</a></p>
    //          <p className="font-normal text-[12px] text-[#777777] mt-[5px] text-center">Already have an account? <a className="text-[#323232]" href="/dev/test/auth/signin">Sign In</a></p>
    //       </div>
    //    )

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className={`border-[#cecece] ${response.status == 200 ? "flex flex-col items-center justify-center" : ''} bg-white border rounded-[8px] w-full max-w-[480px] p-[1.2rem]`}>
                <h2 className="font-medium text-[20px] mb-[20px] text-center">{ response.status !== 200 ? "Sign Up" : "Success"}</h2>
                {
                    response.status == 200 && <h2 className='mt-[3px] ml-[1px] justify-center items-center text-[20px]'>{response.message}</h2>
                }
                {
                    response.status != 200 &&
                    (
                        <Form {...form}>
                            <form {...form.submitAction(formAction)}>
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input disabled={isPending} {...field} className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="name" name='Name' type="text" placeholder="Name"/>
                                        </FormControl>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input disabled={isPending} {...field} className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="email" name='Email' type="email" placeholder="Email"/>
                                        </FormControl>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input disabled={isPending} {...field} className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="password" name='Password' type="password" placeholder="Password"/>
                                        </FormControl>
                                        <p className={`mb-[2px] lg:text-xs ${passwordError.password != "" ? !passwordError.isLong ? 'text-red-500' : 'text-success hidden' : 'text-gray-400'} ml-1`}>• 8 charactors</p>
                                        <p className={`mb-[2px] lg:text-xs ${passwordError.password != "" ? !passwordError.isLower || !passwordError.isUpper || !passwordError.isNumber || !passwordError.isSpecial ? 'text-red-500' : 'text-success hidden' : 'text-gray-400'} ml-1`}>• 1 lower, 1 upper, 1 number, 1 special character {"(# ? ! @)"}</p>
                                    </FormItem>
                                )} />
                                {
                                    passwordError.isError ? password == "" ? "" : "" :
                                    <>
                                        <FormField control={form.control} name="confirm_password" render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input disabled={isPending} {...field} className="w-full p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="confirm-password" name='Confirm Password' type="password" placeholder="Confirm Password"/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} />
                                    </>
                                }
                                {
                                    password != confirmPassword && confirmPassword != "" && !passwordError.isError? <FormMessage className='mt-[3px] ml-[1px]'>Password does not match</FormMessage> : ""
                                }
                                {
                                    response.status != 200 && <FormMessage className='mt-[3px] ml-[1px]'>{response.message}</FormMessage>
                                }
                                {
                                    response.status == 200 && <FormMessage className='mt-[3px] ml-[1px] text-green-600'>{response.message}</FormMessage>
                                }
                                {
                                    form.formState.errors.email && <FormMessage className='mt-[3px] ml-[1px]'>{form.formState.errors.email.message}</FormMessage>
                                }
                                <CButton disabled={(!(password == confirmPassword && !passwordError.isError && form.getValues().name != "" && form.getValues().email != ""))} isLoading={isPending} className="w-full p-[10px] mt-[20px] bg-[#323232] text-white rounded-full text-[16px] cursor-pointer transition ease duration-250 hover:bg-[#000000]" type="submit">Sign Up</CButton>
                            </form>
                        </Form>
                    )
                }
                {
                    response.status != 200 && (
                        <>
                            <p className="font-normal text-[12px] text-[#777777] mt-[20px] text-center">By clicking Sign up, I agree to iNeng's <a className="text-[#323232]" href="#">Terms</a> and <a className="text-[#323232]" href="#">Privacy Policy</a></p>
                            <p className="font-normal text-[12px] text-[#777777] mt-[5px] text-center">Already have an account? <Link className="text-[#323232]" href="/signin">Sign In</Link></p>
                        </>
                    )
                }
            </Card>
        </div>
    )
}
