import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { notification } from 'antd';
import { userApi } from '@/api/user';
import { setUserId, setLoadingStatus } from '@/store/user';
import { RootState } from '@/store/rootReducer';
import { LoginPage } from '../index';

export const LoginWrapper = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state: RootState) => state.user.isLoading);

  const renderErrorLogin = () => {
    notification.error({
      message: 'Ошибка авторизации',
      description: 'Проверьте правильность почты и пароля',
      duration: 3,
    });
  };

  const signIn = useCallback(async () => {
    dispatch(setLoadingStatus(true));

    const result = await userApi.login(email, password);

    if (result.err) {
      renderErrorLogin();

      dispatch(setLoadingStatus(false));
      return;
    }

    dispatch(setUserId(result.val));
    dispatch(setLoadingStatus(false));

    history.push('/');
  }, [email, password]);

  return (
    <LoginPage
      email={email}
      password={password}
      loading={loading}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      signIn={signIn}
    />
  );
};
