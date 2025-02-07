"use client";

import { JSX, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import moment from 'moment';
import {Calendar as BigCalendar, momentLocalizer, View} from 'react-big-calendar';
// import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "@/libs/interfaces";
import AddEventModal from "@/components/modals/AddEvent";
import { getCalendar } from "@/libs/googles/calendar";

export default function CalendarPG(): JSX.Element {
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    async function getCalendarTest() {
        const data = await getCalendar();

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
        getCalendarTest()
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
                    toolbar: ({ onNavigate, onView, label, view }) => (
                        <div className="flex flex-col md:flex-row justify-between items-center pb-[1rem] space-y-2 md:space-y-0">
                            {/* Navigation Buttons */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onNavigate("TODAY")}
                                    className="text-[14px] border-[.5px] border-[#cecece] bg-[#ffffff] text-[#555555] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#f8f8f8]"
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => onNavigate("PREV")}
                                    className="text-[14px] border-[.5px] border-[#cecece] bg-[#ffffff] text-[#555555] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#f8f8f8]"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => onNavigate("NEXT")}
                                    className="text-[14px] border-[.5px] border-[#cecece] bg-[#ffffff] text-[#555555] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#f8f8f8]"
                                >
                                    Next
                                </button>
                            </div>
                            {/* View Selector */}
                            <h2 className="font-[500] text-[16px] text-[#000000]">{label}</h2>
                            <div className="flex space-x-2">
                                {["month", "week", "day", "agenda"].map((viewOption) => (
                                    <button
                                        key={viewOption}
                                        onClick={() => onView(viewOption as View)}
                                        className={`text-[14px] border-[.5px] border-[#cecece] rounded-[8px] px-[1rem] py-[.25rem] ${
                                            view === viewOption ? "bg-black border-black text-white" : "bg-white text-[#555555] hover:bg-[#f8f8f8]"
                                        }`}
                                    >
                                        {viewOption.charAt(0).toUpperCase() + viewOption.slice(1).replace("_", " ")}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ),

                    eventWrapper: (children) => {
                        return (
                            <div className="p-[.25rem]">
                                {children}
                            </div>
                        );
                    },

                    event: ({ event }) => {
                        return (
                            <div className="px-[.25rem]">
                                {event.title}
                            </div>
                        );
                    },

                    month: {
                        dateHeader: ({ label, date }) => {
                            const isToday = new Date().toDateString() === date.toDateString();
                            return (
                                <div className={`text-right font-medium ${isToday ? "text-red-500" : "text-black"}`}>
                                    {label}
                                </div>
                            );
                        },
                        // header: ({ date, localizer }) => (
                        //     <div style={{ fontWeight: 'bold', color: 'black' }}>
                        //         {localizer.format(date, 'weekday')}
                        //     </div>
                        // ),
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
