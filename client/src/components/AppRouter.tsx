import {FC} from 'react';
import {Content} from 'antd/lib/layout/layout';
import {Routes, Route} from 'react-router-dom';
import {useAppSelector} from '../hooks/useAppSelector';
import {publicRoutes, authRoutes} from '../routes';

const AppRouter: FC = () => {
  const isAuth = useAppSelector(state => state.user.isAuth);

  const routes = isAuth ? authRoutes : publicRoutes; 
  return (
    <Content>
      <Routes>
        {routes.map(route => 
          <Route 
            path={route.path}
            element={<route.element/>}
            key={route.path}
          />
        )}
      </Routes>
    </Content>
  );
};

export default AppRouter;