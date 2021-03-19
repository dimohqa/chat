import styled from 'styled-components';
import { Form } from 'antd';

export const FormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    height: auto;
  }

  .footer-buttons {
    margin-top: 20px;
  }

  .personal-data__footer {
    display: flex;
    justify-content: space-between;
  }

  .account__footer {
    display: flex;
    justify-content: flex-end;
  }
`;
