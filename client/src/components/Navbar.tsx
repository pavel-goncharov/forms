import {FC} from 'react';
import {Avatar} from 'antd';
import {Header} from 'antd/lib/layout/layout';
import logoImg from '../assets/logo512.png';
import classes from '../styles/general/Navbar.module.less';
import {NavLink, useLocation} from 'react-router-dom';
import {useAppSelector} from '../hooks/useAppSelector';
import {useActions} from '../hooks/useActions';
import {initNickname} from '../utils/initData';
import {publicPages, privatePages} from '../utils/modeData/navbar';
import {IPage} from '../models/landing';
import {Paths} from '../routes';

const Navbar: FC = () => {
  const isAuth= useAppSelector(state => state.user.isAuth);
  const {setAuth} = useActions();

  const location = useLocation();

  function logOut(): void {
    setAuth(false);
  }
  
  function getActivePage(pages: IPage[], currentPath: string): IPage | null {
    return pages.find(page => page.path === currentPath) || null; 
  }

  function getNavlinkClasses(activePage: IPage | null, pageTitle: string): string {
    if (activePage) {
      return (pageTitle === activePage.title) ? 
        (classes.navlink + '\n' + classes.navlinkActive) : (classes.navlink);
    } else {
      return classes.navlink;
    } 
  }

  const pages = isAuth ? privatePages : publicPages;
  const activePage = getActivePage(pages, location.pathname);

  const nickname = initNickname;
 
  return (
    <Header className={classes.header}>
      <NavLink to={Paths.LANDING} className={classes.navlink}>
        <img src={logoImg} className={classes.logo} alt='logo'/>
        <span className={classes.title}>Forms</span>
      </NavLink>
      <div className={classes.pages}>
        {pages.map(page => 
          <NavLink
            to={page.path} 
              className={() => getNavlinkClasses(activePage, page.title)}
              key={page.path}
            >
              {page.title}
          </NavLink>)
        }
      </div>
      {isAuth &&
        <div className={classes.userScope}>
          <Avatar className={classes.avatar}>{nickname[0].toUpperCase()}</Avatar>
          <span className={classes.nickname}>{nickname}</span>
          <NavLink to={Paths.LANDING} onClick={logOut} className={classes.navlink}>Log out</NavLink>
        </div>
      }
    </Header>
  );
};

export default Navbar;