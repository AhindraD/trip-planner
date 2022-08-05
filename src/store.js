import { configureStore } from "@reduxjs/toolkit";

import TripSlice from "./slices/TripSlice";

const store = configureStore({
    reducer: {
        trips: TripSlice,
    }
})

export default store;