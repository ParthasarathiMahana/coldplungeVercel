import { configureStore } from "@reduxjs/toolkit";
import { doubtReducer } from "./reducers/doubtReducers";

export const store = configureStore({
    reducer:{
        doubtReducer,
    }
})