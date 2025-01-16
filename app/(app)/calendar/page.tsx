"use client";

import { JSX, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Calendar as BigCalendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "@/libs/interfaces";
import { localizer } from "@/libs/utils/timeUtils";
import AddEventModal from "@/components/modals/AddEvent";
import { Button } from "@/components/ui/button";
import { getCalander } from "@/libs/googles/calander";

export default function CalendarPG(): JSX.Element {
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    async function getCalanderTest() {
        const data = await getCalander();

        if (!data) return;

        for (let i = 0; i < data.length; i++) {
            setEvents((prev) => [
                ...prev,
                {
                    title: data[i].summary as string,
                    start: new Date(data[i].start?.date == undefined ? data[i].start?.dateTime as string : data[i].start?.date as string),
                    end: new Date(data[i].end?.date == undefined ? data[i].end?.dateTime as string : data[i].start?.date as string),
                    isAllDay: false,
                },
            ]);
        }
    }

    useEffect(() => {
        getCalanderTest()
    }, [])

    return (
        <div className="max-w-[1200px] mt-[5rem] mx-auto mb-[1rem]">
            <Breadcrumb className="mb-[1rem]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/calendar">Calendar</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-[1rem] flex justify-start">
                <AddEventModal/>
            </div>

            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "600px", backgroundColor: "white" }}
                dayPropGetter={(date) => {
                    const isOutOfMonth = date.getMonth() !== new Date().getMonth();
                    return {
                        className: `${isOutOfMonth ? "bg-transparent text-gray-400" : "bg-white text-black"}`,
                    };
                }}
                components={{
                    toolbar: ({ onNavigate, label }) => (
                        <div className="flex justify-between items-center pb-[1rem]">
                            <button onClick={() => onNavigate("PREV")} className="text-[14px] border border-[#cecece] bg-[#ffffff] text-[#555555] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#f8f8f8]">
                                Prev
                            </button>
                            <h2 className="font-[500] text-[16px] text-[#000000]">{label}</h2>
                            <button onClick={() => onNavigate("NEXT")} className="text-[14px] border border-[#cecece] bg-[#ffffff] text-[#555555] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#f8f8f8]">
                                Next
                            </button>
                        </div>
                    ),

                    month: {
                        dateHeader: ({ label, date }) => {
                            const isToday = new Date().toDateString() === date.toDateString();

                            return (
                                <div className={`text-right font-medium ${isToday ? "text-blue-500" : "text-black"}`}>
                                    {label}
                                </div>
                            );
                        },
                    },

                    agenda: {
                        event: ({ title }) => (
                            <div className="text-blue-600">
                                <span>{title}</span>
                            </div>
                        ),
                    },
                }}
            />
        </div>
    );
}
