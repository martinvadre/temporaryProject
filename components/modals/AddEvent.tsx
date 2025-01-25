import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CButton from "../customUI/button"
import * as DialogPrimitive from "@radix-ui/react-dialog"
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
                <CButton className="shadow-none bg-[#000000] text-[#ffffff] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#323232]">Add Event</CButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Add Event</DialogTitle>
                </DialogHeader>
                <div className="grid py-[1rem]">
                    <Input
                        disabled={loading}
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="border border-[#cecece] rounded-[8px] w-full px-[.5rem] shadow-none mb-[1rem] text-[14px]"
                    />
                    <div className="border border-[#cecece] rounded-[8px]">
                        <div className="flex">
                            <div className="m-auto w-full px-[.5rem]">
                                <Label className="text-center text-[#777777] font-normal" htmlFor="start">Starts</Label>
                            </div>
                            <div className="m-auto">
                                <Input
                                    disabled={loading}
                                    type="datetime-local"
                                    id="start"
                                    value={newEvent.start as string}
                                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                                    className="w-fit border-none shadow-none px-[.5rem] text-[14px]"
                                />
                            </div>
                        </div>
                        <div className="mx-[.5rem] border-b border-[#cecece]"></div>
                        <div className="flex">
                            <div className="m-auto w-full px-[.5rem]">
                                <Label className="text-center text-[#777777] font-normal" htmlFor="end">Ends</Label>
                            </div>
                            <div className="m-auto">
                                <Input
                                    disabled={loading}
                                    type="datetime-local"
                                    id="end"
                                    value={newEvent.end as string}
                                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                                    className="w-fit border-none shadow-none px-[.5rem] text-[14px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogPrimitive.Close className="text-[14px] border border-[#cecece] bg-[#ffffff] text-[#555555] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#f8f8f8]">Cancel</DialogPrimitive.Close>
                    <CButton className="text-[14px] bg-[#000000] text-[#ffffff] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#323232]" isLoading={loading} onClick={handleAddEvent}>&nbsp;&nbsp;Save&nbsp;&nbsp;</CButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
