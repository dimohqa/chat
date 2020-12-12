import React, { ChangeEvent } from 'react';
import {
  Button, Input, Form, Row, Col, Checkbox, Typography,
} from 'antd';
import { Link } from 'react-router-dom';

import './LoginPage.css';

type Props = {
  email: string;
  password: string;
  loading: boolean;
  onChangeEmail: (email: string) => void;
  onChangePassword: (password: string) => void;
  signIn: () => void;
};

export const LoginPage: React.FC<Props> = (props: Props) => {
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChangeEmail(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChangePassword(event.target.value);
  };

  return (
    <Row className="login-page">
      <Col span={12} />
      <Col span={12}>
        <Row className="login-page" align="middle">
          <Col offset={6} span={12}>
            <Typography.Title>Добро пожаловать!</Typography.Title>
            <Form>
              <Form.Item>
                <Input
                  placeholder="Email"
                  size="large"
                  value={props.email}
                  onChange={onChangeEmail}
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  placeholder="Пароль"
                  size="large"
                  value={props.password}
                  onChange={onChangePassword}
                />
              </Form.Item>
              <Form.Item>
                <Row justify="space-between">
                  <Checkbox>Запомнить меня</Checkbox>
                  <Link to="/">Забыли пароль?</Link>
                </Row>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={props.signIn} loading={props.loading}>
                  Войти
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
