import { getTodos } from "@/libs/googles/calander";
import { ToDo } from "@prisma/client";
import TodoTable from "./todoTable";


export default async function TodoList() {
    const todos: ToDo[] = await getTodos() as ToDo[] | [];

    const base = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : process.env.NEXT_PUBLIC_API_BASE_URL;

    return (
        <div>
            <TodoTable data={todos} />
        </div>
    )
}
