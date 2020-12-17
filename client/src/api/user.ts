import { Ok, Err } from 'ts-results';
import { Result } from '@/types/Result';
import { http } from './http';

// TODO: добавить корректные сообщения об ошибках

type UserApi = {
  login: (email: string, password: string) => Promise<Result<{id: string}>>;
  registration: ({
    firstName,
    lastName,
    email,
    password,
  }: {firstName: string; lastName: string; email: string; password: string}) => Promise<Result<{}>>;
};

export const userApi: UserApi = {
  async login(email: string, password: string): Promise<Result<{id: string}>> {
    try {
      const response = await http.post<{ id: string }>('/auth/login', {
        email,
        password,
      });

      return new Ok(response.data);
    } catch (error) {
      switch (error.status) {
        case 404:
          return new Err('Error');
        case 500:
          return new Err('Ошибка сервера. Попробуйте повторить запрос чуть позже.');
        default:
          return new Err('Default error');
      }
    }
  },

  async registration({
    firstName,
    lastName,
    email,
    password,
  }): Promise<Result<{}>> {
    try {
      const response = await http.post<{}>('/auth/registration', {
        firstName,
        lastName,
        email,
        password,
      });

      return new Ok(response.data);
    } catch (error) {
      switch (error.status) {
        case 403:
          return new Err('Error');
        case 400:
          return new Err(error.response.data.message);
        case 500:
          return new Err('Ошибка сервера. Попробуйте повторить запрос чуть позже.');
        default:
          return new Err('Default error');
      }
    }
  },
};
