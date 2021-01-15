import React from 'react';
import { Avatar, Button, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const ProfileModal = (props: Props) => (
  <Modal footer={null} visible={props.visible} onCancel={props.onClose}>
    <Avatar />
    <Upload action="user/uploadAvatar" showUploadList={false} name="avatar">
      <Button type="primary" icon={<UploadOutlined />}>
        Загрузить
      </Button>
    </Upload>
  </Modal>
);
