import { Ok, Err } from 'ts-results';
import { Result } from '@/types/Result';
import { http } from './http';

type UserApi = {
  patch(newData: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): Promise<Result<{ firstName: string; lastName: string; email: string }>>;
};

export const userApi: UserApi = {
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
