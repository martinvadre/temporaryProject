"use client";

import { Card } from '@/components/ui/card'
import { emailSignInAction, googleSignInAction } from '@/libs/actions/actions'
import { signInSchema } from '@/libs/schemas/schemas'
import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { useFormAction } from '@/libs/hooks/useFormAction'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import CButton from '@/components/customUI/button';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { FaGoogle } from "react-icons/fa"


export default function SignInWithCredencial() {
    const [response, formAction, isPending] = useActionState(emailSignInAction, {"status": 0, "message": ""})
    const [toastId, setToastId] = useState<string>("GAY")

    const form = useFormAction<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        await formAction(data)

        toast.loading("Sign in...", {
            id: toastId
        })
    }

    useEffect(() => {
        if (!response.status) {
            return;
        }

        if (response.status != 200) {
            toast.error(response?.message as string, {
                id: toastId
            });
         }

        else if (response.status == 200) {
            form.reset()

            toast.success(response?.message as string, {
                id: toastId
             });

            const timeoutId = setTimeout(() => {
                window.location.href = "/"
            }, 2000)

            return () => clearTimeout(timeoutId)
        }
    }, [isPending, response, toastId])

    return (
        <Card className="bg-white rounded-[8px] border-[#cecece] shadow-none border w-full max-w-[480px] p-[1.2rem] justify-center items-center">
            <h2 className="font-medium text-[20px] mb-[20px] text-center">Sign In</h2>
            <form action={googleSignInAction}>
                <Button disabled={isPending || response.status == 200} className="w-full h-auto bg-inherit hover:bg-inherit py-2 border border-[#cecece] text-lg text-[#777777] rounded-full cursor-pointer transition ease duration-250 hover:border-[#323232] hover:text-[#323232]" type="submit"><FaGoogle/>Contiue with Google</Button>
            </form>
            <div className="font-normal text-[12px] leading-[1.5] text-[#777777] my-[7px] text-center">or</div>

            <Form {...form}>
                <form {...form.submitAction(onSubmit)}>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input disabled={isPending || response.status == 200} {...field} className="w-full h-auto p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="email" name='Email' type="email" placeholder="Email"/>
                            </FormControl>
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input disabled={isPending || response.status == 200} {...field} className="w-full h-auto p-[10px] mt-[5px] border border-[#cecece] rounded-[8px] text-[14px]" id="password" type="password" placeholder="Password" name='password'/>
                            </FormControl>
                        </FormItem>
                    )} />
                    {
                        response.status != 200 && <FormMessage className="mt-[3px] ml-[1px]">{response.message}</FormMessage>
                    }
                    {
                        form.formState.errors.password && <FormMessage className="mt-[3px] ml-[1px]">{form.formState.errors.password.message}</FormMessage>
                    }
                    <CButton isLoading={isPending || response.status == 200} isDisabled={!(form.getValues().password != "" && form.getValues().email != "")} className="w-full h-auto p-[10px] mt-[20px] bg-[#323232] text-white rounded-full text-[16px] cursor-pointer transition ease duration-250 hover:bg-[#000000]" type="submit">Sign In</CButton>
                </form>
            </Form>


            <p className="font-normal text-[12px] leading-[1.5] text-[#777777] mt-[20px] text-center">New user? <Link className="text-[#323232]" href="/auth/signup">Sign up</Link></p>
        </Card>
    )
}
