import React, { useEffect, useState } from 'react';
import { Avatar, Button, Form, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useForm } from 'antd/es/form/Form';
import { validateMessages } from '@/constants/validateMessages';
import { userApi } from '@/api/user';
import { User } from '@/types/User';
import ImgCrop from 'antd-img-crop';
import { UploadFile } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';

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
  profile: { [index: string]: string } & User;
  visible: boolean;
  onClose: () => void;
  onChangeUserProfile: (user: User) => void;
};

export const ProfileModal = (props: Props) => {
  const [form] = useForm();
  const [
    changedUserDataIsFetching,
    setChangedUserDataLoadingStatus,
  ] = useState<boolean>(false);

  const onChangeUserData = async () => {
    setChangedUserDataLoadingStatus(true);

    const newData = Object.keys(form.getFieldsValue())
      .filter(key => form.getFieldValue(key) !== props.profile[key])
      .reduce(
        (res, key) => ({
          ...res,
          [key]: form.getFieldValue(key),
        }),
        {},
      );

    const result = await userApi.patch(newData);

    if (result.err) {
      setChangedUserDataLoadingStatus(false);

      return;
    }

    props.onChangeUserProfile({ ...props.profile, ...result.val });

    setChangedUserDataLoadingStatus(false);
    props.onClose();
  };

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      props.onChangeUserProfile({
        ...props.profile,
        avatar: info.file.response.filename,
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      email: props.profile.email,
    });
  }, [form, props.profile]);

  return (
    <Modal
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={onChangeUserData}
          loading={changedUserDataIsFetching}
        >
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
        <Avatar size={128} src={props.profile.avatar} />
        <ImgCrop rotate>
          <Upload
            action="user/uploadAvatar"
            showUploadList={false}
            onChange={handleChange}
            name="avatar"
          >
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
        </ImgCrop>
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
      </Form>
    </Modal>
  );
};
