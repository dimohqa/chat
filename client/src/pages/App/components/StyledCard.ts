import styled, { css } from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)<{ isActive?: boolean }>`
  padding: 8px 12px 8px 8px;
  height: 74px;
  background-color: ${props => (props.isActive ? 'blue' : '#f3f4f6')};

  .ant-card-body {
    width: 100%;
    display: flex;
    padding: 0;
  }
  .ant-card-body::before {
    content: inherit;
  }
  .ant-card-body::after {
    content: inherit;
  }
  ${props =>
    !props.isActive &&
    css`
      &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
      }
    `}

  &:hover .icons-wrapper {
    visibility: visible;
  }
`;

export const Content = styled.div`
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: 15px;
  line-height: 15px;
`;
