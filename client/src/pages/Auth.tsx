import {FC, useState} from 'react';
import {Paths} from '../routes';
import {loginMode, signUpMode} from '../utils/layoutData/auth';
import {Button, Form, Input} from 'antd';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {IAuthMode} from '../models/auth';
import {useActions} from '../hooks/useActions';
import classes from '../styles/auth/Auth.module.less';


const Auth: FC = () => {
  const {setAuth} = useActions();

  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin: boolean = (location.pathname === Paths.LOGIN);
  const authPage: IAuthMode = isLogin ? loginMode : signUpMode;

  function signIn() {
    setAuth(true);
    navigate(Paths.CATALOG);
  }

  return (
    <div className={classes.auth}>
      <Form className={classes.form} layout='vertical'>
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
          <Button onClick={signIn} type="primary" htmlType="submit" size='large' className={classes.btn}>
            {authPage.btnTitle}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;