import { http } from '@/api/http';
import { Result } from '@/types/Result';
import { Friend } from '@/types/Friend';
import { Err, Ok } from 'ts-results';

export const FriendsApi = {
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
};
