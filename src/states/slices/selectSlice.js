import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selected: "",
}

const selectSlice = createSlice({
    name: "selected",
    initialState,
    reducers: {
        setSelect: (state, action)=>{
            state.search = action.payload
        },
        clearSelect: (state)=>{
            state.search = ""
        },
    }
})

export const { setSelect, clearSelect } = selectSlice.actions;
export default selectSlice.reducer;