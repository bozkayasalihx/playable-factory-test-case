import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type Todo from "server/src/models/Todo";

export type InitialState = {
    data: Todo | null;
};
const initialState: InitialState = { data: null };

const selectionSlice = createSlice({
    name: "selection",
    initialState: initialState,
    reducers: {
        selectTodo: (state, action: PayloadAction<Todo | null>) => {
            state.data = action.payload;
        },
    },
});

export const { selectTodo } = selectionSlice.actions;
export default selectionSlice.reducer;
