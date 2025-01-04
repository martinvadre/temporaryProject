import { HouseIcon } from "lucide-react"
import { CalendarDaysIcon } from "lucide-react"
import { ListCheckIcon } from "lucide-react"
import { SettingsIcon } from "lucide-react"

import { SidebarList } from "@/libs/interfaces";

export const home: SidebarList[] = [
    { name: "Home", path: "/", icon: HouseIcon },
];

export const sidebarList: SidebarList[] = [
    { name: "Calendar", path: "/calendar", icon: CalendarDaysIcon },
    { name: "Todo List", path: "/todo", icon: ListCheckIcon },
    { name: "Setting", path: "/setting", icon: SettingsIcon },
];
