import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    count:0 ,
}
const CalendarSlice = createSlice({
    name:'calendar',
    initialState,
    reducers:{
        increment: (state) => {
            state.count += 1; //add a glass of water
        },
        decrement: (state) => {
            if (state.count > 0) state.count -= 1; //remove a glass of water
        },
        reset: (state) => {
            state.count = 0;
        },
    },
});