export const API_URL = process.env.REACT_APP_API_URL;
export const apiReducerPath = 'appApi';

export const FilterCollapsePanel = {
  header: "Filter", 
  key: "filter"
}

export const apiTags = {
  form: 'Form'
}

export enum UserUrls {
  SIGN_UP = '/user/signup',
  LOGIN = '/user/login',
  AUTH = '/user/auth',
  NICKNAME = '/user/:id/nickname',
  GET_ME = 'user/me'
}

export enum CatalogUrls {
  CREATE = '/catalog',
  FORMS = '/catalog'
}

export enum FormUrls {
  DELETE = '/form/:id',
  TITLE = '/form/:id/title',
  ITEMS = '/form/:id',
  AUTHOR = '/form/:id/author'
}

export enum PlayUrls {
  PASSAGE = '/play/:id'
}

export enum StatisticUrls {
  FILTER_QUESTIONS = 'statistic/:id/filter/questions',
  FILTER_USERS = 'statistic/:id/filter/users',
  STATISTIC = '/statistic/:id',
  PASSAGES = '/statistic/:id/passages'
}

export enum EditUrls {
  INFO = '/edit/:id/info',
  SAVE = '/edit/:id/save'
}

export enum HttpMethods {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum SliceNames {
  USER = 'user',
  CATALOG = 'catalog',
  PLAY = 'play',
  EDIT = 'edit',
  STATISTIC = 'statistic'
} 

export enum LocalStorage {
  TOKEN = 'token'
}

export enum HeaderModes {
  EDIT = 'edit',
  PLAY = 'play',
  STATISTIC = 'statistic'
}

export enum KeyOfButtons {
  INFO = 'info',
  SAVE = 'save',
  SEND = 'send',
  USERS = 'users'
}

export enum FilterParts {
  QUESTIONS = 'Questions',
  USERS = 'Users'
}