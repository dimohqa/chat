import { Message } from '@/types/Message';
import { User } from '@/types/User';
import { chunkMessageListIntoGroups } from '../chunkMessageListIntoGroups';

const author1: User = {
  firstName: '',
  lastName: '',
  avatar: '',
  email: '',
  _id: 'test-id1',
};

const author2: User = {
  ...author1,
  _id: 'test-id2',
};

const message1 = {
  content: '',
  author: author1,
  createdAt: new Date(),
  _id: '',
};

const message2 = {
  ...message1,
  author: author2,
};

describe('should return with', () => {
  test('zero message', () => {
    const mockMessageList: Message[] = [];

    expect(chunkMessageListIntoGroups(mockMessageList)).toStrictEqual([]);
  });

  test('one message', () => {
    const mockMessageList: Message[] = [message1];

    expect(chunkMessageListIntoGroups(mockMessageList)).toStrictEqual([
      [message1],
    ]);
  });

  test('two message from different authors', () => {
    const mockMessageList: Message[] = [message1, message2];

    expect(chunkMessageListIntoGroups(mockMessageList)).toStrictEqual([
      [message1],
      [message2],
    ]);
  });

  test('two message from different reverse authors', () => {
    const mockMessageList: Message[] = [message2, message1];

    expect(chunkMessageListIntoGroups(mockMessageList)).toStrictEqual([
      [message2],
      [message1],
    ]);
  });

  test('two messages with one author', () => {
    const mockMessageList: Message[] = [message1, message1];

    expect(chunkMessageListIntoGroups(mockMessageList)).toStrictEqual([
      [message1, message1],
    ]);
  });

  test('three messages forming three groups', () => {
    const mockMessageList: Message[] = [message1, message2, message1];

    expect(chunkMessageListIntoGroups(mockMessageList)).toStrictEqual([
      [message1],
      [message2],
      [message1],
    ]);
  });

  test('three posts, two of which are from the same author', () => {
    const mockMessageList: Message[] = [message1, message1, message2];

    expect(chunkMessageListIntoGroups(mockMessageList)).toStrictEqual([
      [message1, message1],
      [message2],
    ]);
  });
});
