"use client";

import { JSX ,useEffect, useState } from "react";
import { ContentLayout } from "@/components/panel/content-layout";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function CalendarPG(): JSX.Element {

    return (
        <ContentLayout title="Calendar">
            <Breadcrumb className="mb-4 pl-[1.2rem]">
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href="/calendar">Calendar</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <h1>Calender Page</h1>
            </div>
        </ContentLayout>
    );
}
