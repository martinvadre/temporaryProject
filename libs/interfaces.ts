import { User } from "next-auth";
import { LucideIcon } from "lucide-react";

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

interface EventAttendee {
    email: string
    displayName: string
    responseStatus?: string
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
    summary: string
}
