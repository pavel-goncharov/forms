import { ItemType } from "antd/lib/menu/hooks/useItems";
import {RoutePaths} from "../constants/routes";
import {IPage} from "../types/landing";

enum PageTitles {
  CATALOG = 'Catalog',
  LOG_IN = 'Log in',
  SIGN_UP = 'Sign up'
}

// IPage[]
export const privatePages: IPage[] = [
  {title: PageTitles.CATALOG, path: RoutePaths.CATALOG}
];

export const publicPages = [
  {title: PageTitles.LOG_IN, path: RoutePaths.LOGIN},
  {title: PageTitles.SIGN_UP, path: RoutePaths.SIGN_UP}
];