import { IUser } from "./user";

export interface ISignUp {
  success: string;
}
export interface ILogin {
  success: boolean;
}
export interface ILoginError {
  status: number;
  data: {
    message: string;
  };
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface ISignUpParams extends ILoginParams {
  nickname: string;
}

export interface IAuthMode {
  title: string;
  btnTitle: string;
  redirect: {
    title: string;
    titlePath: string;
    path: string;
  };
}

export interface IJwtDecode {
  id: number;
  nickname: string;
  email: string;
  exp: number;
  iat: number;
}

export enum ValidateHelpers {
  DEFAULT = '',
  NICKNAME_REQUIRED = 'Nickname is required',
  EMAIL_REQUIRED = 'Email is required',
  PASSWORD_REQUIRED = 'Password is required',
  CHECK_EMAIL = 'Check the entered email',
  CHECK_PASSWORD = 'Check the entered password',
  SET_ANOTHER_NICKNAME = 'Set an another nickname',
  SET_ANOTHER_EMAIL = 'Set an another email',
}

export enum ValidateErrorTitles {
  LOGIN_REQUIRED = 'Email and password are required',
  NO_EXIST = 'Such user doesn\'t exist',
  WRONG = 'Wrong password',
  SIGN_UP_REQUIRED = 'Nickname, email and password are required',
  EMAIL_EXISTS = 'User with such email already exists',
  NICKNAME_EXISTS = 'User with such nickname already exists',
  SERVER_ERROR = 'Unknown server error'
}

export enum ValidateStatusCodes {
  CODE400 = 400,
  CODE401 = 401,
  CODE409 = 409,
  CODE500 = 500 
}

export enum ValidateStatuses {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error', 
  VALIDATING = 'validating'
}

// fast --------------------------------------------------------------------
export interface IFastSignUp {
  user: IUser;
  accessToken: string;
}
