import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    count:0 ,
}

const waterSlice = createSlice({
    name:'water',
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

export const{increment, decrement, reset} = waterSlice.actions;
export default waterSlice.reducer;