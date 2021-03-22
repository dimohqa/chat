import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Friend } from '@/types/Friend';

type FriendsState = {
  friends: Friend[];
  friendsIsFetching: boolean;
};

const initialState: FriendsState = {
  friends: [],
  friendsIsFetching: true,
};

const friends = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends(state, action: PayloadAction<Friend[]>) {
      state.friends = action.payload;
    },
    setFriendsFetchingStatus(state, action: PayloadAction<boolean>) {
      state.friendsIsFetching = action.payload;
    },
  },
});

export const { setFriends, setFriendsFetchingStatus } = friends.actions;

export default friends.reducer;
