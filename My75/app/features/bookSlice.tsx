import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    count:0 ,
}

const bookSlice = createSlice({
    name:'miles',
    initialState,
    reducers:{
        increment: (state) => {
            state.count += 1; //add a miles you run
        },
        decrement: (state) => {
            if (state.count > 0) state.count -= 1; //excess miles?
        },
        reset: (state) => {
            state.count = 0;
        },
    },
});

export const{increment, decrement, reset} = bookSlice.actions;
export default bookSlice.reducer;