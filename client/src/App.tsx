import {FC} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Layout} from 'antd';
import {store} from './store/store';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Layout className="layout">
        <Navbar/>
        <AppRouter/>
      </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;