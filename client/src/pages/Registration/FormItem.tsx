import styled, { css } from 'styled-components';
import { Form } from 'antd';

export const FormItem = styled(Form.Item)<{ footer?: boolean }>`
  .ant-form-item-label > label {
    height: auto;
  }

  ${props =>
    props.footer &&
    css`
      .ant-form-item-control-input-content {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-top: 16px;
      }
    `}
`;
