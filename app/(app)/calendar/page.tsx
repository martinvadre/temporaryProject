"use client";

import { JSX, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const defaultEvents = [
    {
        title: "Team Meeting",
        allDay: true,
        start: new Date(2025, 0, 10), // January 10, 2025
        end: new Date(2025, 0, 10),
    },
];

export default function CalendarPG(): JSX.Element {
    const [events, setEvents] = useState(defaultEvents);
    const [newEvent, setNewEvent] = useState({
        title: "",
        start: new Date().toISOString().slice(0, 16),
        end: new Date().toISOString().slice(0, 16),
    });

    const handleAddEvent = () => {
        const start = new Date(newEvent.start);
        const end = new Date(newEvent.end);

        if (!newEvent.title.trim()) {
            alert("Event title cannot be empty.");
            return;
        }

        if (start > end) {
            alert("End date/time must be after start date/time.");
            return;
        }

        // Check for overlapping events
        const overlap = events.some(
            (event) =>
                (start >= event.start && start < event.end) || // Overlaps existing start
                (end > event.start && end <= event.end) || // Overlaps existing end
                (start <= event.start && end >= event.end) // Envelops existing event
        );

        if (overlap) {
            alert("The event overlaps with an existing event.");
            return;
        }

        const formattedEvent = {
            title: newEvent.title.trim(),
            start,
            end,
            allDay: false,
        };

        setEvents([...events, formattedEvent]);
        setNewEvent({
            title: "",
            start: new Date().toISOString().slice(0, 16),
            end: new Date().toISOString().slice(0, 16),
        });
    };

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

            {/* Add Event Form */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="border-[0.5px] border-[#cecece] rounded-[8px] px-2 py-1 mr-[0.5rem] mb-[0.5rem]"
                />
                <input
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) =>
                        setNewEvent({ ...newEvent, start: e.target.value })
                    }
                    className="border-[0.5px] border-[#cecece] rounded-[8px] px-2 py-1 mr-[0.5rem] mb-[0.5rem]"
                />
                <input
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) =>
                        setNewEvent({ ...newEvent, end: e.target.value })}
                    className="border-[0.5px] border-[#cecece] rounded-[8px] px-2 py-1 mr-[0.5rem] mb-[0.5rem]"
                />
                <button
                    onClick={handleAddEvent}
                    className="bg-[#000000] text-white rounded-[8px] px-[1rem] py-[.25rem] mr-[0.5rem] mb-[0.5rem] hover:bg-[#323232]">
                    Add Event
                </button>
            </div>

            {/* Calendar */}
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "600px", backgroundColor: "white", }}
                components={{
                    // Custom toolbar
                    toolbar: (props) => (
                        <div className="border-[.5px] border-solid border-b-0 border-[#cecece] flex justify-between items-center bg-white p-[.5rem] rounded-t-[8px]">
                            <button
                                onClick={() => props.onNavigate("PREV")}
                                className="bg-[#000000] text-white px-[1rem] py-[.25rem] rounded-[6px] hover:bg-[#323232]">
                                Prev
                            </button>
                            <h2 className="font-[500] text-[16px] text-[#000000]">{props.label}</h2>
                            <button
                                onClick={() => props.onNavigate("NEXT")}
                                className="bg-[#000000] text-white px-[1rem] py-[.25rem] rounded-[6px] hover:bg-[#323232]">
                                Next 
                            </button>
                        </div>
                    ),
            
                    // Custom month view day content
                    month: {
                        dateHeader: (props) => (
                            <div className="text-gray-700 rounded-[8px] p-[.25rem]">
                                <span>{props.label}</span>
                            </div>
                        ),
                    },
            
                    // Custom agenda view
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