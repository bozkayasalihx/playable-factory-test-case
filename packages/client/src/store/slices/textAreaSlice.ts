import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ITextArea {
    data: string;
}
const initialState: ITextArea = {
    data: "",
};

const textAreaSlice = createSlice({
    name: "textArea",
    initialState: initialState,
    reducers: {
        textAreaAction: (state, action: PayloadAction<{ data: string }>) => {
            state.data = action.payload.data;
        },
    },
});

export const { textAreaAction } = textAreaSlice.actions;
export default textAreaSlice.reducer;
