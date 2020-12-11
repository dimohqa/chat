import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { LoginPage } from '../LoginPage';
import { setLoginStatus, setUser } from '../../../store/user';

export const LoginWrapper = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  const signIn = useCallback(async () => {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });

    if (response.status !== 200) {
      return;
    }

    dispatch(setUser(response.data));
    dispatch(setLoginStatus(true));
  }, [email, password]);

  return (
    <LoginPage setEmail={setEmail} setPassword={setPassword} signIn={signIn} />
  );
};
