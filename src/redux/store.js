import { configureStore } from "@reduxjs/toolkit";
import typeSlice from "./typeSlice";

export const store = configureStore({
    reducer: {
        type: typeSlice,
    },
});