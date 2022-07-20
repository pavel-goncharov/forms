export const API = '/api';

export const Routes = {
  USER: '/user',
  CATALOG: '/catalog',
  FORM: '/form',
  PLAY: '/play',
  EDIT: '/edit',
  STATISTIC: '/statistic'
};

export const UserRoutes = {
  SIGN_UP: '/signup',
  LOGIN: '/login',
  GET_ME: '/me',
  LOGOUT: '/logout',
  REFRESH: '/refresh'
};

export const CatalogRoutes = {
  DEFAULT: '/'
}

export const FormRoutes = {
  FORM: '/:id',
  TITLE: '/:id/title',
  AUTHOR: '/:id/author'
}

export const PlayRoutes = {
  PASSAGE: '/:id',
  CHECK: '/:id/check'
}

export const EditRoutes = {
  INFO: '/:id/info',
  SAVE: '/:id/save',
}

export const StatisticRoutes = {
  FILTER_QUESTIONS: '/:id/filter/questions',
  FILTER_USERS: '/:id/filter/users',
  STATISTIC: '/:id',
  PASSAGES: '/:id/passages'
}