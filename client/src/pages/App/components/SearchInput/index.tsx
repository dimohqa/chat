import React, { useEffect } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDebounce } from '../../../../hooks/useDebounce';

const Search = styled(Input)`
  background-color: #f3f4f6;

  .ant-input {
    background-color: #f3f4f6;
  }
`;

type Props = {
  searchValue: string;
  placeholder: string;
  onChangeSearchValue: (searchValue: string) => void;
  callbackApi: () => void;
};

export const SearchInput = (props: Props) => {
  const { debounceSearchValue, searchStatus } = useDebounce(
    props.searchValue,
    500,
  );

  useEffect(() => {
    if (searchStatus) {
      props.callbackApi();
    }
  }, [debounceSearchValue, searchStatus]);

  return (
    <AutoComplete
      value={props.searchValue}
      onChange={props.onChangeSearchValue}
      style={{ width: '100%' }}
    >
      <Search
        placeholder={props.placeholder}
        prefix={<SearchOutlined style={{ color: '#1890ff' }} />}
      />
    </AutoComplete>
  );
};
