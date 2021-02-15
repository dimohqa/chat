import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Steps, Typography } from 'antd';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { AccountForm } from '@/types/Registration';
import { StepStatus, Step } from '@/types/Step';
import { Account } from './Account';
import { PersonalData } from './PersonalData';
import { Avatar } from './Avatar';

import './Registration.css';

enum StepRegistration {
  ACCOUNT,
  PERSONAL_DATA,
  AVATAR,
}

export type PersonalDataForm = {
  firstName: string;
  lastName: string;
  city: string;
  age: number;
};

export const Registration = () => {
  const [title, setTitle] = useState<string>('');
  const [accountForm, setAccountForm] = useState<AccountForm | null>(null);
  // const [
  //   personalDataForm,
  //   setPersonalDataForm,
  // ] = useState<PersonalDataForm | null>(null);
  const [stepsStatus, setStepsStatus] = useState<{
    account: StepStatus;
    personalData: StepStatus;
    avatar: StepStatus;
  }>({
    account: 'wait',
    personalData: 'wait',
    avatar: 'wait',
  });

  const history = useHistory();

  const onChangeStepStatus = (step: Step, status: StepStatus) => {
    if (stepsStatus[step] !== 'finish' || status !== 'wait') {
      setStepsStatus({
        ...stepsStatus,
        [step]: status,
      });
    }
  };
  console.log(stepsStatus);

  // const loading = useSelector((state: RootState) => state.user.isLoading);
  //
  // const renderErrorNotification = (error: string) => {
  //   notification.error({
  //     message: 'Ошибка регистрации',
  //     description: error,
  //     duration: 3,
  //   });
  // };
  //
  // const onRegistrationHandle = useCallback(async () => {
  //   dispatch(setLoadingStatus(true));
  //
  //   const result = await authApi.registration({ ...form.getFieldsValue() });
  //
  //   if (result.err) {
  //     renderErrorNotification(result.val);
  //     dispatch(setLoadingStatus(false));
  //
  //     return;
  //   }
  //
  //   dispatch(setLoadingStatus(false));
  //   history.push('/login');
  // }, [dispatch, form, history]);

  const onChangeCurrentStep = (step: number) => {
    let stepPath;
    switch (step) {
      case StepRegistration.ACCOUNT:
        stepPath = 'account';
        break;
      case StepRegistration.PERSONAL_DATA:
        stepPath = 'personalData';
        break;
      case StepRegistration.AVATAR:
        stepPath = 'avatar';
        break;
      default:
        stepPath = 'account';
    }

    history.push(stepPath);
  };

  const currentStep = useMemo(() => {
    const pathParts = history.location.pathname.split('/');
    const routePath = pathParts[pathParts.length - 1];

    switch (routePath) {
      case 'account':
        setTitle('Учетная запись');
        return StepRegistration.ACCOUNT;
      case 'personalData':
        setTitle('Личные данные');
        return StepRegistration.PERSONAL_DATA;
      case 'avatar':
        setTitle('Аватар');
        return StepRegistration.AVATAR;
      default:
        return StepRegistration.ACCOUNT;
    }
  }, [history.location.pathname]);

  useEffect(() => {
    console.log(accountForm);
  }, [accountForm]);

  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: '10%' }}>
        <Steps
          type="navigation"
          onChange={onChangeCurrentStep}
          current={currentStep}
        >
          <Steps.Step title="Учетная запись" status={stepsStatus.account} />
          <Steps.Step title="Личные данные" status={stepsStatus.personalData} />
          <Steps.Step title="Аватар" status={stepsStatus.avatar} />
        </Steps>
      </div>
      <Row align="middle" style={{ height: '20%' }} justify="center">
        <Typography.Title>{title}</Typography.Title>
      </Row>
      <Row align="top" style={{ height: '70%' }} justify="center">
        <Col span={8}>
          <Switch>
            <Route exact path="/registration/account">
              <Account
                form={accountForm}
                setForm={setAccountForm}
                setStatus={(status: StepStatus) =>
                  onChangeStepStatus('account', status)
                }
              />
            </Route>
            <Route exact path="/registration/personalData">
              <PersonalData />
            </Route>
            <Route exact path="/registration/avatar">
              <Avatar />
            </Route>
            <Redirect to="/registration/account" />
          </Switch>
        </Col>
      </Row>
    </div>
  );
};
