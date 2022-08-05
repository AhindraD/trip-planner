import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const TripSlice = createSlice({
    name: 'trips',
    initialState: {

    },
    reducers: {
        add: () => { }
    }
});

export const { add } = TripSlice.actions

export default TripSlice.reducer