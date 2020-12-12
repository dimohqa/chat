import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  firstName: string;
  lastName: string;
  isLogin: boolean;
  userId: string;
};

const initialState: UserState = {
  firstName: '',
  lastName: '',
  isLogin: false,
  userId: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<{ id: string }>) {
      state.userId = action.payload.id;
      state.isLogin = true;
    },
  },
});

export const {
  setUserId,
} = user.actions;

export default user.reducer;
