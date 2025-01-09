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

            <div className="mb-4 flex justify-end">
                <AddEventModal/>
            </div>

            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "600px", backgroundColor: "white", }}
                components={{
                    toolbar: ({onNavigate, label}) => (
                        <div className="border-[.5px] border-solid border-b-0 border-[#cecece] flex justify-between items-center bg-white p-[.5rem] rounded-t-[8px]">
                            <Button onClick={() => onNavigate("PREV")} className="px-[1rem] py-[.25rem] rounded-[6px]">
                                    Prev
                            </Button>
                            <h2 className="font-[500] text-[16px] text-[#000000]">{label}</h2>
                            <Button onClick={() => onNavigate("NEXT")} className="px-[1rem] py-[.25rem] rounded-[6px]">
                                Next
                            </Button>
                        </div>
                    ),

                    month: {
                        dateHeader: (props) => {
                            return (
                                <div className="text-gray-700 rounded-[8px] p-[.25rem]">
                                    <span>{props.label}</span>
                                </div>
                            );
                        },
                    },

                    agenda: {
                        event: (event) => (
                            <div className="text-blue-600">
                                <span>{event.title}</span>
                            </div>
                        ),
                    },
                }}
            />
        </div>
    );
}
