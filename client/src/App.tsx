import {FC, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Layout} from 'antd';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import {useActions} from './hooks/useActions';
import {useAppSelector} from './hooks/useAppSelector';
import {useGetMeMutation, useRefreshTokenMutation} from './api/endPoints/auth';

const App: FC = () => {
  const [refreshToken] = useRefreshTokenMutation();
  const [getMe] = useGetMeMutation();

  const isAuth = useAppSelector(state => state.user.isAuth);
  const user = useAppSelector(state => state.user.user);
  const {setAuth, setUser} = useActions();

  useEffect(() => {
    if(!isAuth && !user) handlerRefreshToken()
  }, []);

  async function handlerRefreshToken(): Promise<void> {
    const res = await refreshToken().unwrap();
    if(res.success) {
      const user = await getMe().unwrap();
      setUser(user);
      setAuth(true);
    }
  }

  return (
    <BrowserRouter>
      <Layout>
        <Navbar/>
        <AppRouter/>
      </Layout>
    </BrowserRouter>
  );
};

export default App;