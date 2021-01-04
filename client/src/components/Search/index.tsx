import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

type Props = {
  placeholder: string;
};

export const Search = (props: Props) => {
  const [value, setValue] = useState<string>('');

  return (
    <AutoComplete value={value} onChange={setValue} style={{ width: '100%' }}>
      <Input
        placeholder={props.placeholder}
        prefix={<SearchOutlined style={{ color: '#1890ff' }} />}
      />
    </AutoComplete>
  );
};
