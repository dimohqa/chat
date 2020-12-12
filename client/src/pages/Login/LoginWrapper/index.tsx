import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userApi } from '@/api/user';
import { setUserId } from '@/store/user';
import { useHistory } from 'react-router';
import { LoginPage } from '../LoginPage';

export const LoginWrapper = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();
  const history = useHistory();

  const signIn = useCallback(async () => {
    const result = await userApi.login(email, password);

    if (result.err) {
      return;
    }

    dispatch(setUserId(result.val));
    history.push('/');
  }, [email, password]);

  return (
    <LoginPage setEmail={setEmail} setPassword={setPassword} signIn={signIn} />
  );
};
