import { Users, Settings, LucideIcon, Calendar, ListIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Account",
      menus: [
        {
          href: "/calendar",
          label: "Calendar",
          icon: Calendar
        },
        {
          href: "/todo",
          label: "Todo List",
          icon: ListIcon
        },
        {
          href: "/settings",
          label: "Setting",
          icon: Settings
        }
      ]
    }
  ];
}
