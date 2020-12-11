import { Ok, Err } from 'ts-results';
import { Result } from '../types/Result';
import { http } from './http';

export const userApi = {
  async login(email: string, password: string): Promise<Result<{ firstName: string; lastName: string }>> {
    try {
      const response = await http.post<{ firstName: string, lastName: string }>('/auth/login', {
        email,
        password,
      });

      return new Ok(response.data);
    } catch (error) {
      switch (error) {
        case 404:
          return new Err('Error');
        default:
          return new Err('Default error');
      }
    }
  },
};
