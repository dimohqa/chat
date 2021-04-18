import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { notification } from 'antd';
import { authApi } from '@/api/auth';
import { LoginLayout } from './LoginLayout';

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [singInIsLoading, setSignInLoadingStatus] = useState(false);

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

    const result = await authApi.login(email, password);

    if (result.err) {
      renderErrorLogin();
      setSignInLoadingStatus(false);

      return;
    }

    setSignInLoadingStatus(false);

    history.push('/');
  }, [email, history, password]);

  return (
    <LoginLayout
      email={email}
      password={password}
      loading={singInIsLoading}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      signIn={signIn}
    />
  );
};
