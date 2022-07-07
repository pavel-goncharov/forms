import {FC, useState} from 'react';
import {Paths} from '../routes';
import {loginMode, signUpMode} from '../utils/layoutData/auth';
import {Button, Form, Input} from 'antd';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {IAuthMode, IJwtDecode} from '../models/auth';
import {useActions} from '../hooks/useActions';
import classes from '../styles/auth/Auth.module.less';
import { LocalStorage } from '../utils/constants';
import jwtDecode from 'jwt-decode';
import { IUser } from '../models/user';
import userApi from '../api/extended/userApi';

const Auth: FC = () => {
  const {setAuth, setUser} = useActions();
  
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('pavelgoncharov@gmail.com');
  const [password, setPassword] = useState<string>('pavel123');
  const [login] = userApi.useLoginMutation();
  const [signUp] = userApi.useSignUpMutation();
  
  const navigate = useNavigate();
  const location = useLocation();

  async function signIn() {
    if(isLogin) logIn();
    else register();
  }

  async function register() {
    const reqBody = {nickname, email, password};
    const res = await signUp(reqBody);
    
    if(!("data" in res)) return;

    if(res.data.success) logIn();
  }

  async function logIn() {
    const reqBody = {email, password};
    const res = await login(reqBody).unwrap();
    const token = res.token;
    // cookie instead localStorage
    localStorage.setItem(LocalStorage.TOKEN, token);
    
    const jwtData: IJwtDecode = jwtDecode(token);
    const user: IUser = {
      id: jwtData.id,
      nickname: jwtData.nickname,
      email: jwtData.email      
    }
    setUser(user);
    setAuth(true);
    navigate(Paths.CATALOG);
  }

  const isLogin: boolean = (location.pathname === Paths.LOGIN);
  const authPage: IAuthMode = isLogin ? loginMode : signUpMode;

  return (
    <div className={classes.auth}>
      <Form onFinish={signIn} className={classes.form} layout='vertical'>
        <h2 className={classes.title}>{authPage.title}</h2>
        {!isLogin &&
          <Form.Item label="Nickname" name="nickname" className={classes.formItemInput}>
            <Input value={nickname} onChange={e => setNickname(e.target.value)}/>
          </Form.Item>
        }
        <Form.Item label="Email" name="email" className={classes.formItemInput}>
          <Input value={email} onChange={e => setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Password" name="password" className={classes.formItemInput}>
          <Input.Password value={password} onChange={e => setPassword(e.target.value)}/>
        </Form.Item>
        <div>
          <span>{authPage.redirect.title + '\n'}</span>
          <NavLink to={authPage.redirect.path}>{authPage.redirect.titlePath}</NavLink>
        </div>
        <Form.Item className={classes.formItemBtn}>
          <Button type="primary" htmlType="submit" size='large' className={classes.btn}>
            {authPage.btnTitle}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;