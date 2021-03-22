import { combineReducers } from 'redux';
import socket from '@/store/socket';
import friends from '@/store/friends';
import user from '@/store/user';

export const rootReducer = combineReducers({
  friends,
  user,
  socket,
});

export type RootState = ReturnType<typeof rootReducer>;
