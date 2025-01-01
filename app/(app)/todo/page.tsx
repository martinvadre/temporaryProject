"use client";

import { JSX ,useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import CLink from "@/components/customUI/link";

export default function TodoPG(): JSX.Element {

    return (
        <div className="max-w-[1200px] mt-20 m-auto">
            <Breadcrumb className="mb-4">
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <CLink href="/">Home</CLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <CLink isDisabled={true} href="/todo">To Do</CLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <h1>To Do Page</h1>
            </div>
        </div>
    );
}
