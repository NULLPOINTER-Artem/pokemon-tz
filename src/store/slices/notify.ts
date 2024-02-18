import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type NotifySeverity = 'warning' | 'success' | 'error' | 'info';

export type Notify = {
  id: number,
  message: string,
  severity: NotifySeverity,
};

interface IPokemonState {
  notifies: Notify[],
};

const initialState: IPokemonState = {
  notifies: [],
};

const DELAY_HIDE = 5000; // milliseconds

export const notify = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    addNotify: (state, action: PayloadAction<Omit<Notify, 'id'>>) => {
      const [lastNotify] = state.notifies.slice(-1);
      const notifyId = lastNotify ? (lastNotify.id + 1) : 1;

      state.notifies.push({
        ...action.payload,
        id: notifyId,
      });
    },
    deleteNotify: (state, action: PayloadAction<number>) => {
      const foundIndex = state.notifies.findIndex((item) => item.id === action.payload);
      if (foundIndex >= 0) state.notifies.splice(foundIndex);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        addNotifyAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (action.payload >= 0) state.notifies.splice(action.payload);
        }
      )
  },
});

export const addNotifyAsync = createAsyncThunk(
  'notify/addNotify',
  async (payload: Omit<Notify, 'id'>, thunkApi) => {
    thunkApi.dispatch(addNotify(payload));

    await new Promise((resolve) => setTimeout(resolve, DELAY_HIDE));

    const state = thunkApi.getState() as RootState;

    return state.notify.notifies.length - 1;
  }
)

export default notify.reducer;
export const {
  addNotify,
  deleteNotify
} = notify.actions;
