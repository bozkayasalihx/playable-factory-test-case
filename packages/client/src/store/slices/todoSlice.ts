import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type Todo from "server/src/models/Todo";
import { todoApi } from "../service/todoApi";

export type InitialState = {
    data: Array<Todo>;
};
const initialState: InitialState = {
    data: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {
        removeTodo: (state, action: PayloadAction<Todo>) => {
            state.data = state.data.filter(s => s.id !== action.payload.id);
        },

        updateTodo: (state, action: PayloadAction<Array<Todo>>) => {
            state.data = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            todoApi.endpoints.getTodos.matchFulfilled,
            (state, action) => {
                state.data = action.payload.data;
            }
        );
    },
});

export const { removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
