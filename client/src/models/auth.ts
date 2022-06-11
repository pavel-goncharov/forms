import { Paths } from "../routes";

export interface IAuthMode {
  title: string;
  btnTitle: string;
  redirect: {
    title: string;
    titlePath: string;
    path: string;
    // path: Paths.LOGIN | Paths.SIGN_UP;
  };
}