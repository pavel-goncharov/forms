export interface ISignUp {
  success: string;
}
export interface ILogin {
  token: string;
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
