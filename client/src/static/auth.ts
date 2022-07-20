import {IAuthMode} from '../types/auth';

export const loginMode: IAuthMode = {
  title: 'Log in', 
  btnTitle: 'Sign in', 
  redirect: {
    title: 'No account?', 
    titlePath: 'Sign up', 
    path: '/signup'
  }
};

export const signUpMode: IAuthMode = {
  title: 'Sing up', 
  btnTitle: 'Sing up', 
  redirect: {
    title: 'Have an account?', 
    titlePath: 'Log in', 
    path: '/login'
  }
};