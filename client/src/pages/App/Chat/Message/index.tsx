import React, { useMemo } from 'react';
import { Message as MessageType } from '@/types/Message';
import styled, { css } from 'styled-components';
import { upperCaseFirstSymbol } from '../../../../helpers/upperCaseFirstSymbol';

const MessageWrapper = styled.div<{ $isLastMessage: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 4px 8px;
  color: #ffffff;
  background-color: #002766;
  border-radius: 5px;
  ${props =>
    props.$isLastMessage &&
    css`
      border-bottom-left-radius: 0;
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
`;

const FullName = styled.div`
  color: #13c2c2;
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

  return (
    <Wrapper>
      {props.isLastMessage && <Triangle />}
      <MessageWrapper $isLastMessage={props.isLastMessage}>
        {props.nameIsVisible && <FullName>{fullNameAuthor}</FullName>}
        {props.message.content}
      </MessageWrapper>
    </Wrapper>
  );
};
