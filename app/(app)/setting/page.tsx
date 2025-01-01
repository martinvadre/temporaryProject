"use client";

import { JSX ,useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SignOutBtn } from "@/dev/components/logoutBtn"
import Link from "next/link";

export default function SettingPG(): JSX.Element {

    return (
        <div className="items-center justify-center px-[1.2rem]">
            <div className="max-w-[1200px] mt-20 m-auto">
                <Breadcrumb className="mb-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/setting">Setting</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div>
                    <h1>Setting Page</h1>
                    <SignOutBtn/>
                </div>
            </div>
        </div>
    );
}
