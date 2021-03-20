import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import { Col, notification, Row, Steps, Typography, Spin } from 'antd';
import { useHistory } from 'react-router';
import {
  AccountForm,
  PersonalDataForm,
  StepRegistration,
} from '@/types/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { setLoadingStatus } from '@/store/user';
import { authApi } from '@/api/auth';
import { Account } from './Account';
import { PersonalData } from './PersonalData';

export const Registration = () => {
  const [currentStep, changeCurrentStep] = useState<number>(
    StepRegistration.ACCOUNT,
  );
  const [accountForm, setAccountForm] = useState<AccountForm>({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [personalDataForm, setPersonalDataForm] = useState<PersonalDataForm>({
    firstName: '',
    lastName: '',
    age: moment().subtract(18, 'years'),
    city: '',
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.user.isLoading);

  const title = useMemo(
    () => (currentStep === 0 ? 'Данные аккаунта' : 'Личные данные'),
    [currentStep],
  );

  const renderErrorNotification = (error: string) => {
    notification.error({
      message: 'Ошибка регистрации',
      description: error,
      duration: 3,
    });
  };

  const onRegistrationHandle = useCallback(async () => {
    dispatch(setLoadingStatus(true));

    const result = await authApi.registration({
      email: accountForm.email,
      password: accountForm.password,
      ...personalDataForm,
    });

    if (result.err) {
      renderErrorNotification(result.val);
      dispatch(setLoadingStatus(false));

      return;
    }

    dispatch(setLoadingStatus(false));
    history.push('/login');
  }, [personalDataForm, accountForm]);

  return (
    <Spin spinning={loading}>
      <div>
        <Steps type="navigation" current={currentStep}>
          <Steps.Step title="Учетная запись" />
          <Steps.Step title="Личные данные" />
        </Steps>
        <Row align="middle" style={{ margin: '50px 0 30px' }} justify="center">
          <Typography.Title>{title}</Typography.Title>
        </Row>
        <Row align="top" style={{ height: '70%' }} justify="center">
          <Col span={8}>
            {currentStep === 0 ? (
              <Account
                form={accountForm}
                setForm={setAccountForm}
                onChangeCurrentStep={changeCurrentStep}
              />
            ) : (
              <PersonalData
                form={personalDataForm}
                setForm={setPersonalDataForm}
                onRegistration={onRegistrationHandle}
                onChangeCurrentStep={changeCurrentStep}
              />
            )}
          </Col>
        </Row>
      </div>
    </Spin>
  );
};
