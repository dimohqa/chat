import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';

const Search = styled(Input)`
  background-color: #f3f4f6;

  .ant-input {
    background-color: #f3f4f6;
  }
`;

type Props = {
  placeholder: string;
  callbackApi: (searchValue: string) => void;
};

export const SearchInput = (props: Props) => {
  const [value, setValue] = useState<string>('');

  const { debounceSearchValue, searchStatus } = useDebounce(value, 500);

  useEffect(() => {
    if (searchStatus) {
      props.callbackApi(debounceSearchValue);
    }
  }, [debounceSearchValue, props.callbackApi, searchStatus]);

  return (
    <AutoComplete value={value} onChange={setValue} style={{ width: '100%' }}>
      <Search
        placeholder={props.placeholder}
        prefix={<SearchOutlined style={{ color: '#1890ff' }} />}
      />
    </AutoComplete>
  );
};
