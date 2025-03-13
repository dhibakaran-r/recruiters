import { configureStore } from "@reduxjs/toolkit";
import searchReduce from './slices/searchSlice'
import selectReduce from './slices/selectSlice'

const store = configureStore({
    reducer: {
        searchInput: searchReduce,
        selected: selectReduce 
    }
})

export default store;