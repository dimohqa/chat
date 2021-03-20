import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { PersonalDataForm, StepRegistration } from '@/types/Registration';
import { validateMessages } from '@/constants/validateMessages';
import { FormItem } from '../FormItem';

type Props = {
  form: PersonalDataForm | null;
  setForm: (form: PersonalDataForm) => void;
  onRegistration: () => void;
  onChangeCurrentStep: (step: number) => void;
};

export const PersonalData = (props: Props) => {
  const [form] = useForm();

  const onChangeForm = () => {
    props.setForm({
      ...form.getFieldsValue(),
      age: form.getFieldValue('age'),
    });
  };
  const onFinish = () => {
    props.onRegistration();
  };
  const onBackButton = () => {
    props.onChangeCurrentStep(StepRegistration.ACCOUNT);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      requiredMark={false}
      layout="vertical"
      initialValues={{ ...props.form }}
      onFieldsChange={onChangeForm}
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
        <DatePicker format="DD.MM.YYYY" placeholder="Возраст" />
      </FormItem>
      <FormItem label="Город" name="city" rules={[{ required: true }]}>
        <Input placeholder="Город" />
      </FormItem>
      <FormItem footer>
        <Button type="default" onClick={onBackButton}>
          Назад
        </Button>
        <Button htmlType="submit" type="primary">
          Продолжить
        </Button>
      </FormItem>
    </Form>
  );
};
