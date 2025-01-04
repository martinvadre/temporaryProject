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
