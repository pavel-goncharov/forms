import {FC, useEffect} from 'react';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import {Layout} from 'antd';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import {LocalStorage} from './utils/constants';
import {useActions} from './hooks/useActions';
import {useAppSelector} from './hooks/useAppSelector';
import userApi from './api/extended/userApi';
import { Paths } from './routes';

const App: FC = () => {

  // const navigate = useNavigate();

  const [refreshToken] = userApi.useRefreshTokenMutation();
  const [getMe] = userApi.useGetMeMutation();


  const isAuth = useAppSelector(state => state.user.isAuth);
  const user = useAppSelector(state => state.user.user);
  const {setAuth, setUser} = useActions();

  useEffect(() => {
    if(!isAuth && !user) handlerRefreshToken()
  }, []);

  async function handlerRefreshToken() {
    const res = await refreshToken().unwrap();
    console.log(res);
    if(res.success) {
      const user = await getMe().unwrap();
      setUser(user);
      setAuth(true);
      // navigate(Paths.CATALOG);
    }
  }


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