import React from 'react';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import {
  patternPasswordContainsLowerCase,
  patternPasswordContainsOneDigit,
  patternPasswordContainsUpperCase,
} from '@/constants/patterns';
import { AccountForm, StepRegistration } from '@/types/Registration';
import { validateMessages } from '@/constants/validateMessages';
import { Link } from 'react-router-dom';
import { FormItem } from '../FormItem';

type Props = {
  form: AccountForm | null;
  setForm: (form: AccountForm) => void;
  onChangeCurrentStep: (step: number) => void;
};

export const Account = (props: Props) => {
  const [form] = useForm();

  const onChangeFormHandler = () => {
    props.setForm(form.getFieldsValue());
  };
  const onFinishHandler = () => {
    props.onChangeCurrentStep(StepRegistration.PERSONAL_DATA);
  };

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      initialValues={{ ...props.form }}
      onFinish={onFinishHandler}
      onChange={onChangeFormHandler}
      validateMessages={validateMessages}
      size="large"
    >
      <FormItem
        label="Email"
        name="email"
        rules={[{ required: true }, { type: 'email' }]}
      >
        <Input placeholder="Email" />
      </FormItem>
      <FormItem
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
      </FormItem>
      <FormItem
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
      </FormItem>
      <FormItem footer>
        <Link to="/login">У вас уже есть аккаунт?</Link>
        <Button htmlType="submit" type="primary">
          Продолжить
        </Button>
      </FormItem>
    </Form>
  );
};
