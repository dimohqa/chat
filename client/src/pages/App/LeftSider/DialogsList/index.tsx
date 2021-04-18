import React, { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Dialog } from '@/types/Dialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { useParams } from 'react-router';
import { socket } from '../../../../helpers/socket';
import { SearchInput } from '../../components/SearchInput';
import { DialogCard } from './DialogCard';

export const DialogsList = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const userId = useSelector((state: RootState) => state.user.userId);

  const currentDialog = useParams<{ id: string }>();

  const getParticipant = (dialog: Dialog) =>
    dialog.participants.filter(participant => participant._id !== userId)[0];

  const getActiveDialog = (dialog: Dialog) =>
    getParticipant(dialog)._id === currentDialog.id;

  useEffect(() => {
    socket.emit('dialogs', null, (newDialogs: Dialog[]) =>
      setDialogs(newDialogs),
    );
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
            key={dialog._id}
            user={getParticipant(dialog)}
            latestMessage={dialog.messages[0]}
            isActive={getActiveDialog(dialog)}
          />
        ))}
      </Spin>
    </Layout>
  );
};
