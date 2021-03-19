import React from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';

type Props = {
  avatar: string | null;
  setAvatar: (avatar: string) => void;
};

export const Photo = (props: Props) => {
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      props.setAvatar(info.file.response.filename);
    }
  };

  return (
    <>
      <Avatar
        size={128}
        src={props.avatar && props.avatar}
        icon={!props.avatar && <UserOutlined />}
      />
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
    </>
  );
};
