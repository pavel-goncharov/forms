import {FC} from 'react';
import {Avatar, Menu} from 'antd';
import {Header} from 'antd/lib/layout/layout';
import logoImg from '../assets/logo512.png';
import classes from '../styles/general/Navbar.module.less';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {useAppSelector} from '../hooks/useAppSelector';
import {useActions} from '../hooks/useActions';
import {publicPages, privatePages} from '../static/navbar';
import {IPage} from '../types/landing';
import {LOGO, LOG_OUT} from '../constants/layout';
import {getActivePage, getFirstLetter} from '../utils/navbar';
import {RoutePaths} from '../constants/routes';
import {useLogoutMutation} from '../api/endPoints/auth';

const Navbar: FC = () => {
  const [logout] = useLogoutMutation();

  const isAuth= useAppSelector(state => state.user.isAuth);
  const nickname = useAppSelector(state => state.user.user?.nickname);
  const {setUser, setAuth} = useActions();

  const location = useLocation();
  const navigate = useNavigate();

  async function logOut(): Promise<void> {
    await logout();
    setUser(null);
    setAuth(false); 
  }
  
  const pages = isAuth ? privatePages : publicPages;
  const activePage = getActivePage(pages, location.pathname);

  const letter = getFirstLetter(nickname);

  function getNavlinkClasses(activePage: IPage | null, pageTitle: string): string {
    if (activePage) {
      return (pageTitle === activePage.title) ? 
        (classes.navlink + '\n' + classes.navlinkActive) : (classes.navlink);
    } else {
      return classes.navlink;
    } 
  }
 
  return (
    <Header className={classes.header}>
      <NavLink to={RoutePaths.LANDING} className={classes.navlink}>
        <img src={logoImg} className={classes.logo} alt={LOGO}/>
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
          <Avatar className={classes.avatar}>{letter}</Avatar>
          <span className={classes.nickname}>{nickname}</span>
          <NavLink to={RoutePaths.LANDING} onClick={logOut} className={classes.navlink}>{LOG_OUT}</NavLink>
        </div>
      }
    </Header>
  );
};

export default Navbar;