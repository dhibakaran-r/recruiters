import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    search: "",
    autoFill: {}
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action)=>{
            state.search = action.payload
        },
        clearSearch: (state)=>{
            state.search = ""
        },
        setAutoFill: (state, action) => {
            state.autoFill = action.payload
        },
        clearAutoFill: (state) =>{
            state.autoFill = ""
        }
    }
})

export const { setSearch, clearSearch, setAutoFill, clearAutoFill} = searchSlice.actions;
export default searchSlice.reducer;