import { ICreateTodo } from "server/src/controller/todo/createTodo";
import { IUpdateTodo } from "server/src/controller/todo/updateTodo";
import baseapi from "./baseApi";
import Todo from "server/src/models/Todo";

export type ReturnTodoType = {
    todo: string;
    tags: string;
    imagerUrl: string;
    fileUrl: string;
    id: string;
};

export const todoApi = baseapi.injectEndpoints({
    endpoints: builder => ({
        createTood: builder.mutation<
            {
                data: Todo;
            },
            ICreateTodo
        >({
            query: crendentials => ({
                url: "create-todo",
                method: "POST",
                data: crendentials,
            }),
        }),

        updateTodo: builder.mutation<
            {
                data: Todo;
            },
            IUpdateTodo
        >({
            query: crendentials => ({
                url: "edit-todo",
                method: "PATCH",
                data: crendentials,
            }),
        }),

        deleteTodo: builder.mutation<void, { todoId: string }>({
            query: crendentials => ({
                url: "delete-todo",
                method: "DELETE",
                data: crendentials,
            }),
        }),

        getTodos: builder.query<{ data: Array<Todo> }, void>({
            query: () => ({
                url: "/list-todos",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateToodMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useGetTodosQuery,
    useLazyGetTodosQuery,
} = todoApi;
