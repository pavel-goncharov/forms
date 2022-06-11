import {FC} from 'react';
import Landing from '../pages/Landing';
import Auth from '../pages/Auth';
import Catalog from '../pages/Catalog';
import FormPage from '../pages/FormPage';
import Statistic from '../pages/Statistic';

interface IRoute {
  path: string;
  element: FC;
}

export enum Paths {
  LANDING = '/', 
  REDIRECT = '*',
  SIGN_UP = '/signup',
  LOGIN = '/login',
  CATALOG = '/catalog',
  EDIT = '/edit/:id',
  PLAY = '/play/:id',
  STATISTIC = '/statistic/:id'
};


const generalRoutes: IRoute[] = [
  {path: Paths.LANDING, element: Landing},
  {path: Paths.REDIRECT, element: Landing}
];

export const publicRoutes: IRoute[] = [
  ...generalRoutes,
  {path: Paths.SIGN_UP, element: Auth},
  {path: Paths.LOGIN, element: Auth}
];

export const authRoutes: IRoute[] = [
  ...generalRoutes,
  {path: Paths.CATALOG, element: Catalog},
  {path: Paths.EDIT, element: FormPage},
  {path: Paths.PLAY, element: FormPage},
  {path: Paths.STATISTIC, element: Statistic}
];