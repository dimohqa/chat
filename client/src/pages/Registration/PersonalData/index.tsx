import React from 'react';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormItem } from '../FormItem';

export const PersonalData = () => {
  const [form] = useForm();

  return (
    <Form form={form}>
      <FormItem label="Имя" name="firstName" rules={[{ required: true }]}>
        <Input placeholder="Имя" />
      </FormItem>
      <FormItem label="Фамилия" name="lastName" rules={[{ required: true }]}>
        <Input placeholder="Фамилия" />
      </FormItem>
    </Form>
  );
};
