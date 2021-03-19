import React, { useCallback, useMemo, useState } from 'react';
import { Col, notification, Row, Steps, Typography, Spin } from 'antd';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { AccountForm, PersonalDataForm } from '@/types/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { setLoadingStatus } from '@/store/user';
import { authApi } from '@/api/auth';
import { Account } from './Account';
import { PersonalData } from './PersonalData';

enum StepRegistration {
  ACCOUNT,
  PERSONAL_DATA,
}

export const Registration = () => {
  const [title, setTitle] = useState<string>('');
  const [accountForm, setAccountForm] = useState<AccountForm>({
    email: '',
    password: '',
  });
  const [personalDataForm, setPersonalDataForm] = useState<PersonalDataForm>({
    firstName: '',
    lastName: '',
    age: '',
    city: '',
  });
  const [
    personalDataPageIsDisabled,
    setPersonalDataPageDisabledStatus,
  ] = useState<boolean>(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.user.isLoading);

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
      firstName: personalDataForm.firstName,
      lastName: personalDataForm.lastName,
      email: accountForm.email,
      password: accountForm.password,
    });

    if (result.err) {
      renderErrorNotification(result.val);
      dispatch(setLoadingStatus(false));

      return;
    }

    dispatch(setLoadingStatus(false));
    history.push('/login');
  }, [personalDataForm, accountForm]);

  const onChangeCurrentStep = (step: number) => {
    const stepPath =
      step === StepRegistration.ACCOUNT ? 'account' : 'personalData';

    history.push(stepPath);
  };

  const currentStep = useMemo(() => {
    const pathParts = history.location.pathname.split('/');
    const routePath = pathParts[pathParts.length - 1];

    if (routePath === 'account') {
      setTitle('Учетная запись');
      return StepRegistration.ACCOUNT;
    }

    setTitle('Личные данные');
    return StepRegistration.PERSONAL_DATA;
  }, [history.location.pathname]);

  const onChangeStepStatus = useCallback(
    (step: StepRegistration) => (step === currentStep ? 'process' : 'wait'),
    [currentStep],
  );

  return (
    <Spin spinning={loading}>
      <div>
        <Steps
          type="navigation"
          onChange={onChangeCurrentStep}
          current={currentStep}
        >
          <Steps.Step
            title="Учетная запись"
            status={onChangeStepStatus(StepRegistration.ACCOUNT)}
          />
          <Steps.Step
            title="Личные данные"
            disabled={personalDataPageIsDisabled}
            status={onChangeStepStatus(StepRegistration.PERSONAL_DATA)}
          />
        </Steps>
        <Row align="middle" style={{ margin: '50px 0 30px' }} justify="center">
          <Typography.Title>{title}</Typography.Title>
        </Row>
        <Row align="top" style={{ height: '70%' }} justify="center">
          <Col span={8}>
            <Switch>
              <Route exact path="/registration/account">
                <Account form={accountForm} setForm={setAccountForm} />
              </Route>
              <Route exact path="/registration/personalData">
                <PersonalData
                  form={personalDataForm}
                  setForm={setPersonalDataForm}
                  onRegistration={onRegistrationHandle}
                  setPersonalDataPageDisabledStatus={
                    setPersonalDataPageDisabledStatus
                  }
                />
              </Route>
              <Redirect to="/registration/account" />
            </Switch>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};
