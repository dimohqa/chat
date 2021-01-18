import React, { useEffect } from 'react';
import { Avatar, Button, Form, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { User } from '@/types/User';
import styled from 'styled-components';
import { useForm } from 'antd/es/form/Form';
import { validateMessages } from '@/constants/validateMessages';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

type Props = {
  profile: User | null;
  visible: boolean;
  onClose: () => void;
};

export const ProfileModal = (props: Props) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      firstName: props.profile?.firstName,
      lastName: props.profile?.lastName,
      email: props.profile?.email,
    });
  }, [form, props.profile]);

  return (
    <Modal
      footer={[
        <Button key="submit" type="primary">
          Изменить
        </Button>,
        <Button key="close" onClick={props.onClose}>
          Отменить
        </Button>,
      ]}
      visible={props.visible}
      onCancel={props.onClose}
      forceRender
    >
      <Header>
        <Avatar size={128} src={props.profile?.avatar} />
        <Upload action="user/uploadAvatar" showUploadList={false} name="avatar">
          <Button
            type="primary"
            shape="round"
            icon={<UploadOutlined />}
            style={{
              marginTop: '8px',
            }}
          >
            Выбрать фото
          </Button>
        </Upload>
      </Header>
      <Form
        form={form}
        {...layout}
        validateMessages={validateMessages}
        requiredMark={false}
      >
        <Form.Item label="Имя" name="firstName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Фамилия" name="lastName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Новый пароль" name="newPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Повторите пароль" name="newPassword">
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
