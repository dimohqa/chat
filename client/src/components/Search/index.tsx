import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '../../hooks/useDebounce';

type Props = {
  placeholder: string;
  callbackApi: (searchValue: string) => void;
};

export const Search = (props: Props) => {
  const [value, setValue] = useState<string>('');

  const { debounceSearchValue, searchStatus } = useDebounce(value, 500);

  useEffect(() => {
    if (searchStatus) {
      props.callbackApi(debounceSearchValue);
    }
  }, [debounceSearchValue, props.callbackApi, searchStatus]);

  return (
    <AutoComplete value={value} onChange={setValue} style={{ width: '100%' }}>
      <Input
        placeholder={props.placeholder}
        prefix={<SearchOutlined style={{ color: '#1890ff' }} />}
      />
    </AutoComplete>
  );
};
