import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  firstName: string;
  lastName: string;
  isLogin: boolean;
  userId: string;
  isLoading: boolean;
};

const initialState: UserState = {
  firstName: '',
  lastName: '',
  isLogin: false,
  userId: '',
  isLoading: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<{ userId: string }>) {
      state.userId = action.payload.userId;
      state.isLogin = true;
    },
    setLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setUserId,
  setLoadingStatus,
} = user.actions;

export default user.reducer;
