import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Friend } from '@/types/Friend';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { upperCaseFirstSymbol } from '../../../../helpers/upperCaseFirstSymbol';

const HeaderWrapper = styled.div`
  height: 64px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #d9d9d9;
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 10px;
`;

const DialogName = styled.span`
  margin-left: 16px;
  font-size: 16px;
`;

type Props = {
  dialogName: string;
  participants: Friend[];
};

export const Header = (props: Props) => {
  const { userId } = useSelector((root: RootState) => root.user);

  const participant = useMemo(
    () => props.participants.find(item => item._id !== userId),
    [props.participants, userId],
  );

  const dialogName = useMemo(() => {
    const fullNameParticipant = participant
      ? `${upperCaseFirstSymbol(participant.firstName)} ${upperCaseFirstSymbol(
          participant.lastName,
        )}`
      : '';

    return props.dialogName || fullNameParticipant;
  }, [props.dialogName, participant]);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Avatar
          size={32}
          src={participant && `/${participant.avatar}`}
          icon={!participant?.avatar && <UserOutlined />}
        />
        <DialogName>{dialogName}</DialogName>
        {props.participants.length > 2 && (
          <span>{`${props.participants.length} участников`}</span>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  );
};
