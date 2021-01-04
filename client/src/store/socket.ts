import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SocketState = {
  connected: boolean;
};

const initialState: SocketState = {
  connected: false,
};

const socket = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnectedStatus(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
  },
});

export const { setConnectedStatus } = socket.actions;

export default socket.reducer;
