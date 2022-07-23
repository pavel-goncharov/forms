export const API_URL = 'http://localhost:5000/api';
export const credentials = 'include';
export const apiReducerPath = 'appApi';

export const apiTags = {
  form: 'Form',
  user: 'User'
}

export enum HttpMethods {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum UserUrls {
  SIGN_UP = '/user/signup',
  LOGIN = '/user/login',
  GET_ME = '/user/me',
  LOGOUT = '/user/logout',
  REFRESH = '/user/refresh'
}

export enum CatalogUrls {
  ITEMS = '/catalog'
}

export enum FormUrls {
  FORM = '/form/:id',
  TITLE = '/form/:id/title',
  AUTHOR = '/form/:id/author'
}

export enum PlayUrls {
  PASSAGE = '/play/:id',
  CHECK = '/play/:id/check',
}

export enum StatisticUrls {
  FILTER_QUESTIONS = 'statistic/:id/filter/questions',
  FILTER_USERS = 'statistic/:id/filter/users',
  STATISTIC = '/statistic/:id',
  PASSAGES = '/statistic/:id/passages'
}

export enum EditUrls {
  INFO = '/edit/:id/info',
  SAVE = '/edit/:id/save',
}