import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { PersonalDataForm, StepRegistration } from '@/types/Registration';
import { validateMessages } from '@/constants/validateMessages';
import { FormItem } from '../FormItem';

type Props = {
  form: PersonalDataForm | null;
  registrationIsLoading: boolean;
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
  const onFinishHandler = () => {
    props.onRegistration();
    props.onChangeCurrentStep(StepRegistration.PHOTO);
  };
  const onBackButtonHandler = () => {
    props.onChangeCurrentStep(StepRegistration.ACCOUNT);
  };

  return (
    <Form
      form={form}
      onFinish={onFinishHandler}
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
        <Button type="default" onClick={onBackButtonHandler}>
          Назад
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          loading={props.registrationIsLoading}
        >
          Продолжить
        </Button>
      </FormItem>
    </Form>
  );
};
