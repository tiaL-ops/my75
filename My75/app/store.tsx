import { configureStore } from '@reduxjs/toolkit'
import waterReducer from './features/waterSlice';
import milesReducer from './features/milesSlice';
import bookReducer from './features/bookSlice';

// ...

export const store = configureStore({
  reducer: {
    water: waterReducer,
    miles: milesReducer,
    book: bookReducer
  }
})

// Get the type of our store variable
export type AppStore = typeof store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']