import { Ok, Err } from 'ts-results';
import { Result } from '@/types/Result';
import { User } from '@/types/User';
import { http } from './http';

type UserApi = {
  search(searchValue: string): Promise<Result<User[]>>;
  patch(newData: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): Promise<Result<{ firstName: string; lastName: string; email: string }>>;
};

export const userApi: UserApi = {
  async search(searchValue: string): Promise<Result<User[]>> {
    try {
      const response = await http.get<User[]>(
        `/user/search?search=${searchValue}`,
      );

      return new Ok(response.data);
    } catch (error) {
      return new Err('error');
    }
  },

  async patch(
    newData,
  ): Promise<Result<{ firstName: string; lastName: string; email: string }>> {
    try {
      const response = await http.patch<{
        firstName: string;
        lastName: string;
        email: string;
      }>('/user', newData);

      return new Ok(response.data);
    } catch (error) {
      switch (error.status) {
        case 409:
          return new Err(error.response.data.message);
        default:
          return new Err('Неизвестная ошибка.');
      }
    }
  },
};
