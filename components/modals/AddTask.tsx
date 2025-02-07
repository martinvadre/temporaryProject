"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import CButton from "../customUI/button"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ToDo } from "@/libs/interfaces";
import { delay } from "@/libs/utils/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { createToDo } from "@/libs/googles/calendar"
import { isBeforeToday } from "@/libs/utils/timeUtils";
import { revalidatePath } from "next/cache"

export default function AddTaskModal() {
    const toastId = "GAY";

    const {data: session} = useSession();

    const [task, setTask] = useState<ToDo>({
        dueAt: new Date(),
        title: "",
    } as ToDo)

    const [loading, setLoading] = useState<boolean>(false);

    const handleAddEvent = async () => {

        setLoading(true);

        toast.loading("Adding task...", { id: toastId });

        await delay(1000);

        if (!task.title || !task.title.trim()) {
            setLoading(false);
            return toast.error("Task title is required.", { id: toastId });
        }

        if (!isBeforeToday(task.dueAt)) {
            setLoading(false);
            return toast.error("Task due date cannot be before today.", { id: toastId });
        }

        if (!createToDo(task)) {
            setLoading(false);
            return toast.error("Failed to add task.", { id: toastId });
        }

        toast.success("Task added successfully.", { id: toastId });

        setTask({
            title: "",
            dueAt: new Date(),
            description: "",
        } as ToDo);

        setLoading(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CButton className="shadow-none bg-[#000000] text-[#ffffff] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#323232]">Add ToDo</CButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Add ToDo</DialogTitle>
                </DialogHeader>
                <div className="grid py-[1rem] gap-[1rem]">
                    <Input
                        disabled={loading}
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        className="border border-[#cecece] rounded-[8px] w-full px-[.5rem] shadow-none text-[14px]"
                    />
                    <div className="border border-[#cecece] rounded-[8px]">
                        <div className="flex">
                            <div className="m-auto w-full px-[.5rem]">
                                <Label className={`text-center text-[#777777] font-normal ${loading ? "opacity-50" : "opacity-100"}`} htmlFor="start">Due Date</Label>
                            </div>
                            <div className="m-auto">
                                <Input
                                    disabled={loading}
                                    type="date"
                                    id="start"
                                    value={task.dueAt.toISOString().slice(0, 10)}
                                    onChange={(e) => setTask({ ...task, dueAt: new Date(e.target.value) })}
                                    className="w-fit border-none shadow-none px-[.5rem] text-[14px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="m-auto w-full px-[.1rem]">
                            <Label className={`text-center font-normal ${loading ? "opacity-50" : "opacity-100"}`} htmlFor="description">Description</Label>
                        </div>
                        <div className="m-auto">
                            <Textarea style={{resize: "none"}} disabled={loading} placeholder="Do not forget to bring an umbrella." className="w-full h-full border border-[#cecece] rounded-[8px] px-[.5rem] shadow-none mb-[1rem] text-[14px]" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })}></Textarea>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogPrimitive.Close style={{pointerEvents: loading ? "none" : "auto"}} disabled={loading} className="disabled:opacity-50 text-[14px] border border-[#cecece] bg-[#ffffff] text-[#555555] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#f8f8f8]">Cancel</DialogPrimitive.Close>
                    <CButton className="text-[14px] bg-[#000000] text-[#ffffff] rounded-[8px] px-[1rem] py-[.25rem] hover:bg-[#323232]" isLoading={loading} onClick={handleAddEvent}>&nbsp;&nbsp;Save&nbsp;&nbsp;</CButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
