import { Result } from '@/types/Result';
import { http } from '@/api/http';
import { Err, Ok } from 'ts-results';
import {
  AccountFormWithoutRepeatPassword,
  PersonalDataForm,
} from '@/types/Registration';

// TODO: добавить корректные сообщения об ошибках

type AuthApi = {
  login: (
    email: string,
    password: string,
  ) => Promise<Result<{ userId: string }>>;
  registration: (
    userInfo: AccountFormWithoutRepeatPassword & PersonalDataForm,
  ) => Promise<Result<{}>>;
  updateToken(): Promise<Result<boolean>>;
};

export const authApi: AuthApi = {
  async login(
    email: string,
    password: string,
  ): Promise<Result<{ userId: string }>> {
    try {
      const response = await http.post<{ userId: string }>('/auth/login', {
        email,
        password,
      });

      return new Ok(response.data);
    } catch (error) {
      switch (error.status) {
        case 404:
          return new Err('Error');
        case 500:
          return new Err(
            'Ошибка сервера. Попробуйте повторить запрос чуть позже.',
          );
        default:
          return new Err('Default error');
      }
    }
  },

  async registration(userInfo): Promise<Result<{}>> {
    try {
      const response = await http.post<{}>('/auth/registration', {
        ...userInfo,
        age: userInfo.age.toDate(),
      });

      return new Ok(response.data);
    } catch (error) {
      switch (error.status) {
        case 403:
          return new Err('Error');
        case 400:
          return new Err(error.response.data.message);
        case 500:
          return new Err(
            'Ошибка сервера. Попробуйте повторить запрос чуть позже.',
          );
        default:
          return new Err(error.response.data?.message || 'Неизвестная ошибка');
      }
    }
  },

  async updateToken(): Promise<Result<boolean>> {
    try {
      const response = await http.get<boolean>('/auth/updateToken');

      return new Ok(response.data);
    } catch (error) {
      return new Err('Error');
    }
  },
};
