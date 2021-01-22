import React, { useCallback } from 'react';
import { Button, Col, Form, Input, notification, Row, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingStatus } from '@/store/user';
import {
  patternPasswordContainsLowerCase,
  patternPasswordContainsOneDigit,
  patternPasswordContainsUpperCase,
} from '@/constants/patterns';
import { userApi } from '@/api/user';
import { RootState } from '@/store/rootReducer';
import { validateMessages } from '@/constants/validateMessages';

export const Registration = () => {
  const [form] = useForm();
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

    const result = await userApi.registration({ ...form.getFieldsValue() });

    if (result.err) {
      renderErrorNotification(result.val);
      dispatch(setLoadingStatus(false));

      return;
    }

    dispatch(setLoadingStatus(false));
    history.push('/login');
  }, [dispatch, form, history]);

  return (
    <Row style={{ height: '100%' }}>
      <Col span={12}>
        <Row align="middle" style={{ height: '100%' }}>
          <Col offset={5} span={14}>
            <Row justify="center">
              <Typography.Title>Регистрация</Typography.Title>
            </Row>
            <Form
              size="large"
              form={form}
              requiredMark={false}
              onFinish={onRegistrationHandle}
              validateMessages={validateMessages}
            >
              <Form.Item name="firstName" rules={[{ required: true }]}>
                <Input placeholder="Имя" />
              </Form.Item>
              <Form.Item name="lastName" rules={[{ required: true }]}>
                <Input placeholder="Фамиля" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true }, { type: 'email' }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true },
                  { type: 'string', max: 30, min: 8 },
                  {
                    pattern: new RegExp(patternPasswordContainsLowerCase),
                    message: 'Добавьте латинскую букву в нижнем регистре',
                  },
                  {
                    pattern: new RegExp(patternPasswordContainsOneDigit),
                    message: 'Добавьте хотя бы одну цифру',
                  },
                  {
                    pattern: new RegExp(patternPasswordContainsUpperCase),
                    message: 'Добавьте латинскую букву в верхнем регистре',
                  },
                ]}
              >
                <Input.Password placeholder="Пароль" />
              </Form.Item>
              <Form.Item
                name="repeatPassword"
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Пароли не совпадают!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Повторите пароль" />
              </Form.Item>
              <Form.Item>
                <Row justify="space-between" align="middle">
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Зарегистрироваться
                  </Button>
                  <Link to="/login">Уже есть аккаунт?</Link>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
      <Col span={12} />
    </Row>
  );
};
