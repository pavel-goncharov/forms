export interface ILogin {
  success: boolean;
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

export interface IAuthError {
  status: number;
  data: {
    message: string;
  };
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
  SET_ANOTHER_PASSWORD = 'Set a password longer than 7 characters'
}

export enum ValidateErrorTitles {
  LOGIN_REQUIRED = 'Email and password are required',
  NO_EXIST = 'Such user doesn\'t exist',
  WRONG = 'Wrong password',
  SIGN_UP_REQUIRED = 'Nickname, email and password are required',
  EMAIL_EXISTS = 'User with such email already exists',
  NICKNAME_EXISTS = 'User with such nickname already exists',
  SERVER_ERROR = 'Unknown server error',
  NOT_PASSWORD = 'Not strong password'
}

export enum ValidateStatusCodes {
  CODE400 = 400,
  CODE401 = 401,
  CODE409 = 409,
  CODE500 = 500 
}