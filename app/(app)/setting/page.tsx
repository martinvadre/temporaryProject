"use client";

import { JSX ,useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SignOutBtn } from "@/dev/components/logoutBtn";
import CLink from "@/components/customUI/link";

export default function SettingPG(): JSX.Element {

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
                <h1>Setting Page</h1>
                <SignOutBtn/>
            </div>
        </div>
    );
}
