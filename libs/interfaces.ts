import { User } from "next-auth";
import { LucideIcon } from "lucide-react";


interface EventAttendee {
    email: string
    displayName: string
    responseStatus?: string
}

type EventKind = "Event" | "Schedule"
export interface Users extends User {
    role?: string
    password?: string
    emailVerified?: Date
}

export interface SidebarList {
    name: string;
    path: string;
    icon: LucideIcon
}


export interface EventInterface {
    attendees: [
        owner: EventAttendee,
        guest?: EventAttendee
    ]
    description: string
    start: {
        dateTime: string
    }
    end: {
        dateTime: string
    }
    summary?: string
}

export type EventAdd = {
    kind: EventKind,
    event: EventInterface
}

export type CalendarEvent = {
    title: string
    start: string | Date
    end: string | Date
    allDay?: boolean
}
