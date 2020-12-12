import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userApi } from '@/api/user';
import { setLoginStatus, setUser } from '@/store/user';
import { LoginPage } from '../LoginPage';

export const LoginWrapper = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  const signIn = useCallback(async () => {
    const result = await userApi.login(email, password);

    if (result.err) {
      return;
    }

    dispatch(setUser(result.val));
    dispatch(setLoginStatus(true));
  }, [email, password]);

  return (
    <LoginPage setEmail={setEmail} setPassword={setPassword} signIn={signIn} />
  );
};
