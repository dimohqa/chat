import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Dialog } from '@/types/Dialog';
import { useParams } from 'react-router';
import { Message } from '@/types/Message';
import { Friend } from '@/types/Friend';
import { Header } from './Header';
import { MessageInput } from '../components/MessageInput';
import { MessageList } from './MessageList';
import { socket } from '../../../helpers/socket';

export const Chat = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [participantsDialog, setParticipantsDialog] = useState<Friend[]>([]);
  const [dialogName, setDialogName] = useState<string>('');
  const [messageNotFound, setMessageFoundStatus] = useState<boolean>(false);

  const params = useParams<{ id: string; section: string }>();

  const setStateRoom = (responseRoom: Dialog) => {
    if (!responseRoom) {
      setMessageFoundStatus(true);

      return;
    }

    if (responseRoom.name) {
      setDialogName(responseRoom.name);
    }

    setParticipantsDialog(responseRoom.participants);
    setMessageList(responseRoom.messages);

    setMessageFoundStatus(false);
  };

  useEffect(() => {
    if (params.section === 'chat') {
      socket.emit(
        'getRoomById',
        { roomId: params.id },
        (responseRoom: Dialog) => {
          setStateRoom(responseRoom);
        },
      );

      return;
    }

    socket.emit(
      'getDialog',
      { recipientId: params.id },
      (responseDialog: Dialog) => {
        setStateRoom(responseDialog);
      },
    );
  }, [params]);

  useEffect(() => {
    socket.on('newMessage', (message: Message) => {
      setMessageList([...messageList, message]);
      setMessageFoundStatus(false);
    });

    return () => {
      socket.removeListener('newMessage');
    };
  });

  return (
    <Layout>
      <Header participants={participantsDialog} dialogName={dialogName} />
      <MessageList
        messages={messageList}
        dialogIsMultiple={participantsDialog.length > 2}
        messageNotFound={messageNotFound}
      />
      <MessageInput />
    </Layout>
  );
};
