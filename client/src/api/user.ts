import { Ok, Err } from 'ts-results';
import { Result } from '@/types/Result';
import { SearchUser } from '@/types/User';
import { Pagination } from '@/types/Pagination';
import { http } from './http';

type UserApi = {
  search(
    search: string,
    skip?: number,
    take?: number,
  ): Promise<Result<Pagination<SearchUser>>>;
  patch(newData: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): Promise<Result<{ firstName: string; lastName: string; email: string }>>;
};

export const userApi: UserApi = {
  async search(search, skip?, take = 10) {
    const params = {
      search,
      skip,
      take,
    };
    try {
      const response = await http.get<Pagination<SearchUser>>('/user/search', {
        params,
      });

      return new Ok(response.data);
    } catch (error) {
      return new Err('error');
    }
  },

  async patch(newData) {
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
