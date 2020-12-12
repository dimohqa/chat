import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/User';

type UserState = {
  firstName: string;
  lastName: string;
  isLogin: boolean;
};

const initialState: UserState = {
  firstName: '',
  lastName: '',
  isLogin: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const { firstName, lastName } = action.payload;

      state.firstName = firstName;
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
