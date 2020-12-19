import React, { useEffect, useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { userApi } from '@/api/user';
import { User } from '@/types/User';
import { Loader } from '@/components/Loader';

export const Chat = () => {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
  });
  const [profileIsFetching, setProfileFetchingStatus] = useState<boolean>(false);

  const getProfile = useCallback(async () => {
    setProfileFetchingStatus(true);
    const result = await userApi.getProfile();

    if (result.err) {
      setProfileFetchingStatus(false);

      return;
    }

    setUser(result.val);
    setProfileFetchingStatus(false);
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (profileIsFetching) {
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
