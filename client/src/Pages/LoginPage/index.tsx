import React from "react";
import {Button, Input, Form, Row, Col, Checkbox, Typography } from "antd";
import { Link } from 'react-router-dom';

import './LoginPage.css';

export const LoginPage = () => {
  return (
    <Row className="login-page">
      <Col span={12}></Col>
      <Col span={12}>
        <Row className="login-page" align="middle">
          <Col offset={6} span={12}>
            <Typography.Title>Добро пожаловать!</Typography.Title>
          <Form>
            <Form.Item>
              <Input placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item>
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Form.Item>
              <Row justify="space-between">
                <Checkbox>Запомнить меня</Checkbox>
                <Link to="/">Забыли пароль?</Link>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary">Войти</Button>
            </Form.Item>
          </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}