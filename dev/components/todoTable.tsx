"use client";

import { ToDo } from "@/libs/interfaces";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { isBeforeToday } from "@/libs/utils/timeUtils";
import { deleteToDo, markAsDone } from "@/libs/googles/calendar";
import CButton from "@/components/customUI/button";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

interface DataTableProps<TData> {
    data: TData[]
}

export default function TodoTable<TData extends ToDo, TValue>({data}: DataTableProps<TData>) {

    const [sorting, setSorting] = useState<SortingState>([])

    const col = [
        {
            header: "Title",
            accessorKey: "title",
        },
        {
            header: ({column}: {column: any}) => (<CButton
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Due Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </CButton>),
            accessorKey: "dueAt",
            cell: ({row}: {row: any}) => {
                return (<div className="ml-4">{new Date(row.original.dueAt).toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" })}</div>)
            }
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({row}: {row: any}) => {
                const status = row.original.completed ? "Completed" : !isBeforeToday(row.original.dueAt) ? "Late" : "Not Completed"

                return (
                    <Badge style={{pointerEvents: "none"}} className={`${status === "Completed" && "bg-green-500 text-destructive-foreground"} ${status === "Not Completed" && "bg-destructive text-destructive-foreground"} ${status === "Late" && "bg-yellow-400"}`} variant="secondary">{status}</Badge>
                )
            }
        },
        {
            header: "Actions",
            cell: ({row}: {row: any}) => {
                const [pending, setPending] = useState<boolean>(false)
                const [deleting, setDeleting] = useState<boolean>(false)

                return (
                    <div className="flex gap-2">
                        <CButton isDisabled={row.original.completed} isLoading={pending} onClick={() => {
                            setPending(() => !pending)
                            if (!markAsDone(row.original)) {
                                setPending(false)
                                alert("Failed to mark as done")
                                return;
                            }
                            setPending(() => !pending)
                        }} size={"sm"} variant={"outline"}>{row.original.completed ? "Completed" :"Mark Complete"}</CButton>
                        <CButton isLoading={deleting} size={"icon"} variant={"destructive"} onClick={async () => {
                            setDeleting(() => !deleting)
                            await deleteToDo((row.original as ToDo).calendarId)
                            setDeleting(() => !deleting)
                        }}><Trash2Icon/></CButton>
                    </div>
                )
            }
        }
    ]

    const table = useReactTable({
        columns: col,
        data: data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    return (
        <>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                            ))
                        }
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return(
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={col.length} className="h-24 text-center">
                                    No ToDo.
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <CButton
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    isDisabled={!table.getCanPreviousPage()}
                >
                    Previous
                </CButton>
                <CButton
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    isDisabled={!table.getCanNextPage()}
                >
                    Next
                </CButton>
            </div>
        </>
    )
}
