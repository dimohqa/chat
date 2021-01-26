import { http } from '@/api/http';
import { Result } from '@/types/Result';
import { Friend } from '@/types/Friend';
import { Err, Ok } from 'ts-results';

export const friendsApi = {
  async searchByQuery(searchValue: string): Promise<Result<Friend[]>> {
    try {
      const response = await http.get<Friend[]>(
        `/friends/search?search=${searchValue}`,
      );

      return new Ok(response.data);
    } catch (error) {
      return new Err('error');
    }
  },

  async add(friendId: string): Promise<Result<{}>> {
    try {
      const response = await http.patch<{}>(`/friends/add/${friendId}`);

      return new Ok(response.data);
    } catch (error) {
      return new Err(error.response.data.message);
    }
  },

  async delete(friendId: string): Promise<Result<{}>> {
    try {
      const response = await http.patch<{}>(`/friends/delete/${friendId}`);

      return new Ok(response.data);
    } catch (error) {
      return new Err(error.response.data.message);
    }
  },
};
