import { Moment } from 'moment';

export enum StepRegistration {
  ACCOUNT,
  PERSONAL_DATA,
}

export type AccountForm = {
  email: string;
  password: string;
  repeatPassword: string;
};

export type PersonalDataForm = {
  firstName: string;
  lastName: string;
  age: Moment;
  city: string;
};

export type AccountFormWithoutRepeatPassword = Omit<
  AccountForm,
  'repeatPassword'
>;
