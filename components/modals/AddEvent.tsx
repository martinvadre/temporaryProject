import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CButton from "../customUI/button"
import { CalendarEvent, EventAdd } from "@/libs/interfaces";
import { delay } from "@/libs/utils/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { createEvent } from "@/libs/googles/calander";

export default function AddEventModal() {
    const toastId = "GAY";

    const {data: session} = useSession();

    const [newEvent, setNewEvent] = useState<CalendarEvent>({
        title: "",
        start: new Date().toISOString().slice(0, 16),
        end: new Date().toISOString().slice(0, 16),
    });

    const [evt, setEvt] = useState<EventAdd>({} as EventAdd);

    const [loading, setLoading] = useState<boolean>(false);

    const handleAddEvent = async () => {
        const start = new Date(newEvent.start);
        const end = new Date(newEvent.end);

        setLoading(true);

        toast.loading("Adding event...", { id: toastId });

        await delay(1000);

        if (!newEvent.title.trim()) {
            setLoading(false);
            return toast.error("Event title is required.", { id: toastId });
        }

        if (start > end) {
            setLoading(false);
            return toast.error("Event start time cannot be after end time.", { id: toastId });
        }

        evt.event = {
            summary: newEvent.title.trim(),
            start: {
                dateTime: start.toISOString(),
            },
            end: {
                dateTime: end.toISOString(),
            },
            attendees: [
                {
                    email: session?.user?.email || '',
                    displayName: session?.user?.name || '',
                }
            ],
            description: "",
        };

        evt.kind = "Event"

        await createEvent(evt);

        toast.success("Event added successfully.", { id: toastId });

        setNewEvent({
            title: "",
            start: new Date().toISOString().slice(0, 16),
            end: new Date().toISOString().slice(0, 16),
        });

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CButton className="bg-[#000000] text-white rounded-[8px] px-[1rem] py-[.25rem] mr-[0.5rem] mb-[0.5rem] hover:bg-[#323232]">Add Event</CButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Event Creation</DialogTitle>
                    <DialogDescription>
                        {`Create a new event by filling out the form below`}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                        disabled={loading}
                        type="text"
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="w-full"
                    />
                    <Label htmlFor="start">Start Time</Label>
                    <Input
                        disabled={loading}
                        type="datetime-local"
                        id="start"
                        value={newEvent.start as string}
                        onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                        className="w-full"
                    />
                    <Label htmlFor="end">End Time</Label>
                    <Input
                        disabled={loading}
                        type="datetime-local"
                        id="end"
                        value={newEvent.end as string}
                        onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                        className="w-full"
                    />
                </div>
                <DialogFooter>
                    <CButton isLoading={loading} onClick={handleAddEvent} >Save</CButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
