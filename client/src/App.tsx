import {FC, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Layout} from 'antd';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import {LocalStorage} from './utils/constants';
import {useActions} from './hooks/useActions';
import {useAppSelector} from './hooks/useAppSelector';

const App: FC = () => {
  const {setAuth, setUser} = useActions();

  // time decision
  const isAuth = useAppSelector(state => state.user.isAuth); 
  useEffect(() => {
    if(!isAuth) {
      setUser(null);
      setAuth(false); 
      localStorage.removeItem(LocalStorage.TOKEN);
    }
  }, [isAuth]);

  return (
    <BrowserRouter>
      <Layout className="layout">
        <Navbar/>
        <AppRouter/>
      </Layout>
    </BrowserRouter>
  );
};

export default App;