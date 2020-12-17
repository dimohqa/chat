import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { notification } from 'antd';
import { userApi } from '@/api/user';
import { setUserId } from '@/store/user';
import { Login } from './Login';

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [singInIsLoading, setSignInLoadingStatus] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const renderErrorLogin = () => {
    notification.error({
      message: 'Ошибка авторизации',
      description: 'Проверьте правильность почты и пароля',
      duration: 3,
    });
  };

  const signIn = useCallback(async () => {
    setSignInLoadingStatus(true);

    const result = await userApi.login(email, password);

    if (result.err) {
      renderErrorLogin();
      setSignInLoadingStatus(false);

      return;
    }

    dispatch(setUserId(result.val));
    setSignInLoadingStatus(false);

    history.push('/');
  }, [email, history, password]);

  return (
    <Login
      email={email}
      password={password}
      loading={singInIsLoading}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      signIn={signIn}
    />
  );
};
