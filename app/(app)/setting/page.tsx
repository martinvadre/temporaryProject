"use client";

import { JSX ,useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { SignOutBtn } from "@/dev/components/logoutBtn";
import CLink from "@/components/customUI/link";
import { useSession } from "next-auth/react";
import { Users } from "@/libs/interfaces";

export default function SettingPG(): JSX.Element {
    const [user, setUser] = useState<Users | undefined>(undefined)
    const {data: session} = useSession()

    useEffect(() => {
        if (session) {
            setTimeout(() => {
                setUser(session.user as Users)
            }, 1000);
        }
    }, [session])

    return (
        <div className="max-w-[1200px] mt-[5rem] mx-auto mb-[1rem]">
            <Breadcrumb className="mb-[1rem]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <CLink href="/">Home</CLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <CLink isDisabled={true} href="/setting">Setting</CLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <div className="mb-[.5rem]">
                    <p className="text-[14px] font-medium">Name</p>
                    {
                        !user ? (
                            <Skeleton className="w-48 h-6 rounded-[8px]"/>
                        ) : (
                            <p className="text-[16px] font-light text-[#777777]">{user.name}</p>
                        )
                    }
                    {/* <p className="text-[16px] font-light text-[#777777]">{user.name?.split(" ")[0]}</p> */}
                </div>
                <div className="mb-[.5rem]">
                    <p className="text-[14px] font-medium">Email</p>
                    {
                        !user ? (
                            <Skeleton className="w-72 h-6 rounded-[8px]"/>
                        ) : (
                            <p className="text-[16px] font-light text-[#777777]">{user.email}</p>
                        )
                    }
                    {/* <p className="text-[16px] font-light text-[#777777]">{user.email}</p> */}
                </div>
                <div className="mb-[.5rem]">
                    <SignOutBtn/>
                </div>
            </div>
        </div>
    );
}
