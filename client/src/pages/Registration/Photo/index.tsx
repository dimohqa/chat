import React, { useState } from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Row, Space, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const FullWidthSpace = styled(Space)`
  width: 100%;

  .ant-space-item {
    width: 100%;
  }
`;

const AvatarsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 990px) {
    flex-direction: column;

    .ant-avatar {
      margin-bottom: 20px;
    }
  }
`;

export const Photo = () => {
  const [avatar, setAvatar] = useState<string>('');

  const history = useHistory();

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      setAvatar(info.file.response.filename);
    }
  };

  const onDoneButtonHandler = () => {
    history.push('/');
  };

  return (
    <FullWidthSpace direction="vertical" size={50}>
      <AvatarsContainer>
        <Avatar
          size={128}
          shape="square"
          src={avatar && avatar}
          icon={!avatar && <UserOutlined />}
        />
        <Avatar size={128} src={avatar} icon={!avatar && <UserOutlined />} />
        <Avatar size={64} src={avatar} icon={!avatar && <UserOutlined />} />
        <Avatar size={32} src={avatar} icon={!avatar && <UserOutlined />} />
      </AvatarsContainer>
      <Row justify="center" align="middle">
        <ImgCrop rotate>
          <Upload
            action="/user/uploadAvatar"
            showUploadList={false}
            onChange={handleChange}
            name="avatar"
          >
            <Button
              type="primary"
              icon={<UploadOutlined />}
              style={{
                marginTop: '8px',
              }}
            >
              Выбрать фото
            </Button>
          </Upload>
        </ImgCrop>
      </Row>
      <Row justify="space-between" align="middle">
        <Link to="/">Пропустить</Link>
        <Button type="primary" onClick={onDoneButtonHandler}>
          Готово
        </Button>
      </Row>
    </FullWidthSpace>
  );
};
