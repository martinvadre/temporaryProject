import { JSX, Suspense } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import CLink from "@/components/customUI/link";
import AddTaskModal from "@/components/modals/AddTask";
import TodoList from "@/dev/components/todoList";

export default function TodoPG(): JSX.Element {

    return (
        <div className="max-w-[1200px] mt-[5rem] mx-auto mb-[1rem]">
            <Breadcrumb className="mb-[1rem]">
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <CLink href="/">Home</CLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <CLink isDisabled={true} href="/todo">To Do</CLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <div className="py-[1rem] flex justify-start">
                    <AddTaskModal/>
                </div>
                <div>
                    <h1 className="mb-1">TodoList</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TodoList/>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
