import {FC, useState} from 'react';
import {Paths} from '../routes';
import {loginMode, signUpMode} from '../utils/layoutData/auth';
import {Button, Form, Input, message} from 'antd';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {IAuthMode, IJwtDecode, ILoginError, ValidateErrorTitles, ValidateHelpers, ValidateStatusCodes, ValidateStatuses} from '../models/auth';
import {useActions} from '../hooks/useActions';
import classes from '../styles/auth/Auth.module.less';
import userApi from '../api/extended/userApi';

const Auth: FC = () => {
  const [login] = userApi.useLoginMutation();
  const [signUp] = userApi.useSignUpMutation();
  const [getMe] = userApi.useGetMeMutation();
  
  const {setAuth, setUser} = useActions();
  
  // pavelgoncharov@gmail.com
  // pavel123
  const [errorTitle, setErrorTitle] = useState<string>('');

  const [nickname, setNickname] = useState<string>('');
  const [statusNickname, setStatusNickname] = useState<ValidateStatuses>(ValidateStatuses.VALIDATING);
  const [helpNickname, setHelpNickname] = useState<ValidateHelpers>(ValidateHelpers.DEFAULT);

  const [email, setEmail] = useState<string>('pavelgoncharov@gmail.com');
  const [statusEmail, setStatusEmail] = useState<ValidateStatuses>(ValidateStatuses.VALIDATING);
  const [helpEmail, setHelpEmail] = useState<ValidateHelpers>(ValidateHelpers.DEFAULT);
  
  const [password, setPassword] = useState<string>('pavel123');
  const [statusPassword, setStatusPassword] = useState<ValidateStatuses>(ValidateStatuses.VALIDATING);
  const [helpPassword, setHelpPassword] = useState<ValidateHelpers>(ValidateHelpers.DEFAULT);
  
  
  const navigate = useNavigate();
  const location = useLocation();

  async function signIn() {
    if(isLogin) logIn();
    else register();
  }

  async function register() {
    try {
      const reqBody = {nickname, email, password};
      const res = await signUp(reqBody).unwrap();
      if(res.success) {
        message.info(res.success);
        logIn(true);
      }
    } catch (err: ILoginError | any) {
      handlerSignUpErrorValidate(err);
    }
  }

  async function logIn(isFromRegister: boolean = false) {
    try {
      const reqBody = {email, password};
      const res = await login(reqBody).unwrap();
      if(res.success) {
        const user = await getMe().unwrap();
        setUser(user);
        setAuth(true);
        navigate(Paths.CATALOG);
        if(!isFromRegister) message.info(`Welcome back, ${user.nickname}`);
      }
    } catch (err: ILoginError | any) {
      // handlerLoginErrorValidate(err);
      console.log(err);
    }
  }

  function handlerSignUpErrorValidate(err: ILoginError) {
    handlerValidateAllClear();
    switch(err.status) {
      case ValidateStatusCodes.CODE400:
        setModeAuthRequired(err);
        break;
      case ValidateStatusCodes.CODE409:
        if(err.data.message === ValidateErrorTitles.NICKNAME_EXISTS) {
          setModeSignUpNicknameExists(err);
        } else {
          setModeSignUpEmailExists(err);
        }
        break;
      case ValidateStatusCodes.CODE500:
        setModeSignUpServerError(err); 
        break;
    }
  }

  function handlerLoginErrorValidate(err: ILoginError) {
    handlerValidateAllClear();
    switch(err.status) {
      case ValidateStatusCodes.CODE400:
        setModeAuthRequired(err);
        break;
      case ValidateStatusCodes.CODE401:
        if(err.data.message === ValidateErrorTitles.NO_EXIST) {
          setModeLoginNoUser(err);
        } else {
          setModeLoginNotMatchPasswords(err);
        }
        break; 
    }
  }

  function handlerValidateAllClear() {
    setErrorTitle('');
    if(!isLogin) {
      setHelpNickname(ValidateHelpers.DEFAULT);
      setStatusNickname(ValidateStatuses.VALIDATING);
    }
    setHelpEmail(ValidateHelpers.DEFAULT);
    setStatusEmail(ValidateStatuses.VALIDATING);
    setHelpPassword(ValidateHelpers.DEFAULT);
    setStatusPassword(ValidateStatuses.VALIDATING);
  }

  function setModeAuthRequired(err: ILoginError) {
    setErrorTitle(err.data.message);
    if(!isLogin && !nickname) {
      setStatusNickname(ValidateStatuses.ERROR);
      setHelpNickname(ValidateHelpers.NICKNAME_REQUIRED);
    }
    if(!email) {
      setStatusEmail(ValidateStatuses.ERROR);
      setHelpEmail(ValidateHelpers.EMAIL_REQUIRED);
    }
    if(!password) {
      setStatusPassword(ValidateStatuses.ERROR);
      setHelpPassword(ValidateHelpers.PASSWORD_REQUIRED);
    }
  }

  function setModeSignUpNicknameExists(err: ILoginError) {
    setErrorTitle(err.data.message);
    setStatusNickname(ValidateStatuses.WARNING);
    setHelpNickname(ValidateHelpers.SET_ANOTHER_NICKNAME);
  }

  function setModeSignUpEmailExists(err: ILoginError) {
    setErrorTitle(err.data.message);
    setStatusEmail(ValidateStatuses.ERROR);
    setHelpEmail(ValidateHelpers.SET_ANOTHER_EMAIL);
  }

  function setModeSignUpServerError(err: ILoginError) {
    console.log(err.data.message);
    setErrorTitle(ValidateErrorTitles.SERVER_ERROR);
  }

  function setModeLoginNoUser(err: ILoginError) {
    setErrorTitle(err.data.message);
    setStatusEmail(ValidateStatuses.ERROR);
    setHelpEmail(ValidateHelpers.CHECK_EMAIL);
  }
  
  function setModeLoginNotMatchPasswords(err: ILoginError) {
    setErrorTitle(err.data.message);
    setStatusPassword(ValidateStatuses.ERROR);
    setHelpPassword(ValidateHelpers.CHECK_PASSWORD);
  }

  const isLogin: boolean = (location.pathname === Paths.LOGIN);
  const authPage: IAuthMode = isLogin ? loginMode : signUpMode;

  return (
    <div className={classes.auth}>
      <Form onFinish={signIn} className={classes.form} layout='vertical' size='large'>
        <h2 className={classes.title}>{authPage.title}</h2>
        {errorTitle && <div className={classes.errorTitle}>{errorTitle}</div>}
        {!isLogin &&
          <Form.Item 
            label="Nickname"
            name="nickname"
            validateStatus={statusNickname}
            help={helpNickname}
            className={classes.formItemInput}
          >
            <Input value={nickname} onChange={e => setNickname(e.target.value)}/>
          </Form.Item>
        }
        <Form.Item
          label="Email"
          name="email"
          validateStatus={statusEmail}
          help={helpEmail}
          className={classes.formItemInput}
        >
          <Input value={email} onChange={e => setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item 
          label="Password"
          name="password"
          validateStatus={statusPassword}
          className={classes.formItemInput}
          help={helpPassword}
        >
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