import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";

export const dayOfWeeks = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
] as const;

export function timeToInt(time: string) {
    return parseFloat(time.replace(":", ".")); // 12:30 -> 12.30
}

export const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
