import {FormLayout} from 'antd/lib/form/Form';

export const LOG_OUT: string = 'Log out';
export const LOGO: string = 'logo';
export const TITLE_IS_SEND_PASSAGE: string = 'Are you sure to send your passage?';
export const SUBMIT = 'submit';
export const LARGE = 'large';
export const VERTICAL: FormLayout = 'vertical'; 
export const TITLE_IS_REQUIRED: string = 'Title is required'; 
export const AUTHOR_WARNING: string = 'Author-only access';

export enum CollapseHeaders {
  FILTER = 'Filter',
  STATISTIC = 'Statistic'
}

export enum CollapseKeys {
  FILTER = 'filter',
  STATISTIC = 'statistic'
}

export enum AvatarShapes {
  CIRCLE = 'circle',
  SQUARE = 'square'
}

export enum AvatarSizes {
  NAVBAR = 40,
  SMALL = 18
}

export enum SwitchContents {
  ALL = 'All',
  A = 'A'
}

export enum textAreaRows {
  QUESTION = 2,
  ANSWER = 1
}

export enum BtnTitles {
  DELETE_FORM = 'Delete form',
  SAVE = 'Save',
  LEAVE_PAGE = 'Leave page',
  ADD_ANSWER = 'Add answer',
  SEND = 'Send',
  SEARCH = 'Search',
  NEW = 'New',
  NEW_QUESTION = 'New question'
}

export enum Placeholders {
  FORM_TITLE = 'Form title',
  FORM_DESCRIPTION = 'Form description',
  SEARCH_FORMS = 'Search forms'
}

export enum FormItemLabels {
  NICKNAME = 'Nickname',
  EMAIL = 'Email',
  PASSWORD  = 'Password',
  TITLE = 'Title',
  DESCRIPTION = 'Description'
}

export enum ModalTitles {
  NEW_FORM = 'New Form',
  FORM_INFO = 'Form info',
  WARNING = 'Warning'
}

export enum BtnTypes {
  LINK = 'link',
  PRIMARY = 'primary'
}

export const popConfirmArgs = {
  okText: 'Yes',
  cancelText: 'No'
}

export enum popConfirmPlacements {
  BOTTOM_RIGHT = 'bottomRight',
  TOP_LEFT = 'topLeft',
  LEFT = 'left',
}

export enum FormModes {
  EDIT = 'edit',
  PLAY = 'play',
  STATISTIC = 'statistic',
  DELETE = 'delete'
}

export enum BtnKeys {
  INFO = 'info',
  SAVE = 'save',
  SEND = 'send',
  USERS = 'users',
  LEAVE = 'leave',
  DELETE = 'delete'
}

export enum FilterParts {
  QUESTIONS = 'Questions',
  USERS = 'Users'
}

export enum ValidateStatuses {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error', 
  VALIDATING = 'validating'
}