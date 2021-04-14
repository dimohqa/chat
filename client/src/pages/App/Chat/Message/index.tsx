import React, { useMemo } from 'react';
import { Message as MessageType } from '@/types/Message';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { upperCaseFirstSymbol } from '../../../../helpers/upperCaseFirstSymbol';

const MessageWrapper = styled.div<{ $isLastMessage: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  min-width: 100px;
  color: #ffffff;
  background-color: #002766;
  border-radius: 5px;
  ${props =>
    props.$isLastMessage &&
    css`
      border-bottom-left-radius: 0;
    `}

  ${props =>
    !props.$isLastMessage &&
    css`
      margin-left: 8px;
    `}
`;

const Triangle = styled.div`
  width: 4px;
  height: 4px;
  border: 4px solid transparent;
  border-right: 4px solid #002766;
  border-bottom: 4px solid #002766;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 4px;
`;

const FullName = styled.div`
  color: #13c2c2;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 4px;
  margin-top: auto;
  color: #d9d9d9;
`;

type Props = {
  message: MessageType;
  nameIsVisible: boolean;
  isLastMessage: boolean;
};

export const Message = (props: Props) => {
  const fullNameAuthor = useMemo(
    () =>
      `${upperCaseFirstSymbol(
        props.message.author.firstName,
      )} ${upperCaseFirstSymbol(props.message.author.lastName)}`,
    [props.message],
  );

  const date = useMemo(
    () => moment(props.message.createdAt).format('HH:mm').toString(),
    [props.message.createdAt],
  );

  return (
    <Wrapper>
      {props.isLastMessage && <Triangle />}
      <MessageWrapper $isLastMessage={props.isLastMessage}>
        <div>
          {props.nameIsVisible && <FullName>{fullNameAuthor}</FullName>}
          <span>{props.message.content}</span>
        </div>
        <Date>{date}</Date>
      </MessageWrapper>
    </Wrapper>
  );
};
