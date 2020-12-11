import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  firstName: string;
  lastName: string;
};

type UserState = {
  fistName: string;
  lastName: string;
  isLogin: boolean;
};

const initialState: UserState = {
  fistName: '',
  lastName: '',
  isLogin: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const { firstName, lastName } = action.payload;
      state.fistName = firstName;
      state.lastName = lastName;
    },
    setLoginStatus(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export const {
  setUser,
  setLoginStatus,
} = user.actions;

export default user.reducer;
