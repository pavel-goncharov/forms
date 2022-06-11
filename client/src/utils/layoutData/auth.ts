import {IAuthMode} from "../../models/auth";
// import { Paths } from "../../routes";

// sdsd fix path
export const loginMode: IAuthMode = {
  title: 'Log in', 
  btnTitle: 'Sign in', 
  redirect: {
    title: 'No account?', 
    titlePath: 'Sign up', 
    path: '/signup'
    // path: Paths.SIGN_UP
  }
};

export const signUpMode: IAuthMode = {
  title: 'Sing up', 
  btnTitle: 'Sing up', 
  redirect: {
    title: 'Have an account?', 
    titlePath: 'Log in', 
    path: '/login'
    // path: Paths.LOGIN
  }
};