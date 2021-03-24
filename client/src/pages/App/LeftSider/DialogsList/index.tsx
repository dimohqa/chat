import React, { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Dialog } from '@/types/Dialog';
import { socket } from '../../../../helpers/socket';
import { SearchInput } from '../../components/SearchInput';
import { DialogCard } from './DialogCard';

export const DialogsList = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  useEffect(() => {
    socket.emit('dialogs', (value: Dialog[]) => {
      setDialogs(value);
    });
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: '#f3f4f6' }}>
        <SearchInput
          searchValue={searchValue}
          onChangeSearchValue={setSearchValue}
          placeholder="Поиск диалогов"
          callbackApi={() => {}}
        />
      </Header>
      <Spin spinning={false}>
        {dialogs.map(dialog => (
          <DialogCard
            avatar={dialog.user.avatar}
            firstName={dialog.user.firstName}
            lastName={dialog.user.lastName}
          />
        ))}
      </Spin>
    </Layout>
  );
};
