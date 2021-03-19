import React from 'react';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { PersonalDataForm } from '@/types/Registration';
import { validateMessages } from '@/constants/validateMessages';
import { useHistory } from 'react-router';
import { FormItem } from '../FormItem';

type Props = {
  form: PersonalDataForm | null;
  setForm: (form: PersonalDataForm) => void;
  onRegistration: () => void;
  setPersonalDataPageDisabledStatus: (isDisabled: boolean) => void;
};

export const PersonalData = (props: Props) => {
  const [form] = useForm();

  const history = useHistory();

  const onFinish = () => {
    props.setForm(form.getFieldsValue());
    props.onRegistration();
    props.setPersonalDataPageDisabledStatus(false);
  };

  const onBackButton = () => {
    history.push('/registration/account');
  };

  return (
    <Form
      form={form}
      requiredMark={false}
      layout="vertical"
      initialValues={{ ...props.form }}
      onFinish={onFinish}
      validateMessages={validateMessages}
      size="large"
    >
      <FormItem label="Имя" name="firstName" rules={[{ required: true }]}>
        <Input placeholder="Имя" />
      </FormItem>
      <FormItem label="Фамилия" name="lastName" rules={[{ required: true }]}>
        <Input placeholder="Фамилия" />
      </FormItem>
      <FormItem label="Возраст" name="age" rules={[{ required: true }]}>
        <Input placeholder="Возраст" />
      </FormItem>
      <FormItem label="Город" name="city" rules={[{ required: true }]}>
        <Input placeholder="Город" />
      </FormItem>
      <FormItem>
        <div className="personal-data__footer footer-buttons">
          <Button type="default" onClick={onBackButton}>
            Назад
          </Button>
          <Button htmlType="submit" type="primary">
            Продолжить
          </Button>
        </div>
      </FormItem>
    </Form>
  );
};
