import React, {
  useEffect, useState,
} from 'react';
import { Col, Row } from 'antd';
import { User } from '@/types/User';
import { Loader } from '@/components/Loader';
import { socket } from '../../helpers/socket';

export const Chat = () => {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
  });
  const [profileIsFetching, setProfileFetchingStatus] = useState<boolean>(true);
  const [isConnectedSocket, setConnectedSocketStatus] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();

    socket.on('connection', (response: boolean) => {
      setConnectedSocketStatus(response);
    });
  }, []);

  useEffect(() => {
    if (isConnectedSocket) {
      socket.emit('profile', (userData: User) => {
        setUser(userData);
        setProfileFetchingStatus(false);
      });
    }
  }, [isConnectedSocket]);

  if (profileIsFetching || !isConnectedSocket) {
    return <Loader size="large" />;
  }

  return (
    <Row>
      <Col span={6}>
        {user.firstName}
        {' '}
        {user.lastName}
      </Col>
      <Col span={18} />
    </Row>
  );
};
