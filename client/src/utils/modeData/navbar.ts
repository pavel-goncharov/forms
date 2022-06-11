import {Paths} from "../../routes";
import {IPage} from "../../models/landing";

export const privatePages: IPage[] = [
  {title: 'Catalog', path: Paths.CATALOG}
];

export const publicPages: IPage[] = [
  {title: 'Log in', path: Paths.LOGIN},
  {title: 'Sign up', path: Paths.SIGN_UP}
];