"use client";

import { JSX ,useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SignOutBtn } from "@/dev/components/logoutBtn";
import { Users } from "@/libs/interfaces"
import CLink from "@/components/customUI/link";

export default function SettingPG({user}: {user: Users}): JSX.Element {

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
                    <p className="text-[14px] font-medium">{/*user.name?.split(" ")[0]*/}Name</p>
                    <p className="text-[16px] font-light text-[#777777]">{/*user.email*/}Martin Wongdaeng</p>
                </div>
                <div className="mb-[.5rem]">
                    <p className="text-[14px] font-medium">{/*user.name?.split(" ")[0]*/}Email</p>
                    <p className="text-[16px] font-light text-[#777777]">{/*user.email*/}martinvadre@gmail.com</p>
                </div>
                <div className="mb-[.5rem]">
                    <SignOutBtn/>
                </div>
            </div>
        </div>
    );
}
