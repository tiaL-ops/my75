import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveData, getData } from './storage';

interface ProgressState {
  [date: string]: {
    books: number;
    water: number;
    miles: number;
  };
}

// Load initial state from MMKV
const loadSavedProgress = (): ProgressState => {
  return getData('@daily_progress') || {};
};

// Save state to MMKV
const saveProgress = (state: ProgressState): void => {
  saveData('@daily_progress', state);
};

// Redux Slice
const progressSlice = createSlice({
  name: 'progress',
  initialState: loadSavedProgress(),
  reducers: {
    updateProgress: (
      state,
      action: PayloadAction<{ date: string; type: 'books' | 'water' | 'miles'; value: number }>
    ) => {
      const { date, type, value } = action.payload;
      if (!state[date]) {
        state[date] = { books: 0, water: 0, miles: 0 };
      }
      state[date][type] += value;

      // Persist changes to MMKV
      saveProgress(state);
    },
  },
});

export const { updateProgress } = progressSlice.actions;

const store = configureStore({
  reducer: {
    progress: progressSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
