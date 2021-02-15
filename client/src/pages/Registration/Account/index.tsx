import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import {
  patternPasswordContainsLowerCase,
  patternPasswordContainsOneDigit,
  patternPasswordContainsUpperCase,
} from '@/constants/patterns';
import { AccountForm } from '@/types/Registration';
import { validateMessages } from '@/constants/validateMessages';
import { useHistory } from 'react-router';
import { StepStatus } from '@/types/Step';

type Props = {
  form: AccountForm | null;
  setForm: (form: AccountForm) => void;
  setStatus: (status: StepStatus) => void;
};

export const Account = (props: Props) => {
  const [form] = useForm();

  const history = useHistory();

  const onFinish = () => {
    props.setForm(form.getFieldsValue());

    props.setStatus('finish');

    history.push('/registration/personalData');
  };

  useEffect(() => {
    props.setStatus('process');

    return () => {
      props.setStatus('wait');
    };
  }, []);

  return (
    <>
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        initialValues={{ ...props.form }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        size="large"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Пароль"
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
          label="Повторите пароль"
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
          <Button type="primary" htmlType="submit">
            Продолжить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
