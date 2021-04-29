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

  const recipient = useParams<{ id: string }>();

  useEffect(() => {
    socket.emit(
      'getDialog',
      { recipientId: recipient.id },
      (responseDialog: Dialog) => {
        if (!responseDialog) {
          setMessageFoundStatus(true);

          return;
        }

        if (responseDialog.name) {
          setDialogName(responseDialog.name);
        }

        setParticipantsDialog(responseDialog.participants);
        setMessageList(responseDialog.messages);

        setMessageFoundStatus(false);
      },
    );
  }, [recipient.id]);

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
