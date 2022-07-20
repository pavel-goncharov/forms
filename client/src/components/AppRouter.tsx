import {FC} from 'react';
import {Content} from 'antd/lib/layout/layout';
import {Routes, Route} from 'react-router-dom';
import {useAppSelector} from '../hooks/useAppSelector';
import RouteAuthor from './RouteAuthor';
import Statistic from '../pages/Statistic';
import RoutePlay from './play/RoutePlay';
import Landing from '../pages/Landing';
import Catalog from '../pages/Catalog';
import Auth from '../pages/Auth';
import Edit from '../pages/Edit';
import {RoutePaths} from '../constants/routes';

const AppRouter: FC = () => {
  const isAuth = useAppSelector(state => state.user.isAuth);
  return (
    <Content>
      <Routes>
        <Route path={RoutePaths.LANDING} element={<Landing/>}/>
        <Route path={RoutePaths.REDIRECT} element={<Landing/>}/>
        {isAuth ? 
          <>
            <Route path={RoutePaths.CATALOG} element={<Catalog/>}/>
            <Route path={RoutePaths.PLAY} element={<RoutePlay/>}/>
            <Route element={<RouteAuthor/>}>
              <Route path={RoutePaths.EDIT} element={<Edit/>}/>
              <Route path={RoutePaths.STATISTIC} element={<Statistic/>}/>
            </Route>
          </> 
          : 
          <>
            <Route path={RoutePaths.SIGN_UP} element={<Auth/>}/>
            <Route path={RoutePaths.LOGIN} element={<Auth/>}/>
          </>
        }
      </Routes>
    </Content>
  );
};

export default AppRouter;