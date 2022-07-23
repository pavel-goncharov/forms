import {FC, useState} from 'react';
import {BtnTypes, FormItemLabels, LARGE, SUBMIT, ValidateStatuses, VERTICAL} from '../constants/layout';
import {loginMode, signUpMode} from '../static/auth';
import {Button, Form, Input, message} from 'antd';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {IAuthMode, IAuthError, ValidateErrorTitles, ValidateHelpers, ValidateStatusCodes} from '../types/auth';
import {useActions} from '../hooks/useActions';
import classes from '../styles/auth/Auth.module.less';
import {RoutePaths} from '../constants/routes';
import {useGetMeMutation, useSignUpMutation, useLoginMutation} from '../api/endPoints/auth';

const Auth: FC = () => {
  const [login] = useLoginMutation();
  const [signUp] = useSignUpMutation();
  const [getMe] = useGetMeMutation();
  
  const {setAuth, setUser} = useActions();

  const navigate = useNavigate();
  const location = useLocation();
  
  const [errorTitle, setErrorTitle] = useState<string>('');

  const [nickname, setNickname] = useState<string>('');
  const [statusNickname, setStatusNickname] = useState<ValidateStatuses>(ValidateStatuses.VALIDATING);
  const [helpNickname, setHelpNickname] = useState<ValidateHelpers>(ValidateHelpers.DEFAULT);

  const [email, setEmail] = useState<string>('');
  const [statusEmail, setStatusEmail] = useState<ValidateStatuses>(ValidateStatuses.VALIDATING);
  const [helpEmail, setHelpEmail] = useState<ValidateHelpers>(ValidateHelpers.DEFAULT);
  
  const [password, setPassword] = useState<string>('');
  const [statusPassword, setStatusPassword] = useState<ValidateStatuses>(ValidateStatuses.VALIDATING);
  const [helpPassword, setHelpPassword] = useState<ValidateHelpers>(ValidateHelpers.DEFAULT);
    
  async function signIn(): Promise<void> {
    if(isLogin) logIn();
    else register();
  }

  async function register(): Promise<void> {
    try {
      const reqBody = {nickname, email, password};
      const res = await signUp(reqBody).unwrap();
      if(res.success) {
        message.info(res.success);
        logIn(true);
      }
    } catch (err: IAuthError | any) {
      handlerSignUpErrorValidate(err);
    }
  }

  async function logIn(isFromRegister: boolean = false): Promise<void> {
    try {
      const reqBody = {email, password};
      const res = await login(reqBody).unwrap();
      if(res.success) {
        const user = await getMe().unwrap();
        setUser(user);
        setAuth(true);
        navigate(RoutePaths.CATALOG);
        if(!isFromRegister) message.info(`Welcome back, ${user.nickname}`);
      }
    } catch (err: IAuthError | any) {
      handlerLoginErrorValidate(err);
    }
  }

  function handlerSignUpErrorValidate(err: IAuthError): void {
    handlerValidateAllClear();
    switch(err.status) {
      case ValidateStatusCodes.CODE400:
        if(err.data.message === ValidateErrorTitles.SIGN_UP_REQUIRED) {
          setModeAuthRequired(err);
        } else {
          setModeSingUpNotPassword(err);
        }
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

  function handlerLoginErrorValidate(err: IAuthError): void {
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

  function handlerValidateAllClear(): void {
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

  function setModeAuthRequired(err: IAuthError): void {
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

  function setModeSignUpNicknameExists(err: IAuthError): void {
    setErrorTitle(err.data.message);
    setStatusNickname(ValidateStatuses.WARNING);
    setHelpNickname(ValidateHelpers.SET_ANOTHER_NICKNAME);
  }

  function setModeSignUpEmailExists(err: IAuthError): void {
    setErrorTitle(err.data.message);
    setStatusEmail(ValidateStatuses.ERROR);
    setHelpEmail(ValidateHelpers.SET_ANOTHER_EMAIL);
  }

  function setModeSingUpNotPassword(err: IAuthError): void {
    setErrorTitle(err.data.message);
    setStatusPassword(ValidateStatuses.ERROR);
    setHelpPassword(ValidateHelpers.SET_ANOTHER_PASSWORD);
  }

  function setModeSignUpServerError(err: IAuthError): void {
    console.log(err.data.message);
    setErrorTitle(ValidateErrorTitles.SERVER_ERROR);
  }

  function setModeLoginNoUser(err: IAuthError): void {
    setErrorTitle(err.data.message);
    setStatusEmail(ValidateStatuses.ERROR);
    setHelpEmail(ValidateHelpers.CHECK_EMAIL);
  }
  
  function setModeLoginNotMatchPasswords(err: IAuthError): void {
    setErrorTitle(err.data.message);
    setStatusPassword(ValidateStatuses.ERROR);
    setHelpPassword(ValidateHelpers.CHECK_PASSWORD);
  }

  // Remove it
  function setMockUser(): void {
    setEmail('timofeygolyntov@gmail.com');
    setPassword('timofey12345');
  }

  const isLogin: boolean = (location.pathname === RoutePaths.LOGIN);
  const authPage: IAuthMode = isLogin ? loginMode : signUpMode;

  return (
    <div className={classes.auth}>
      <Form onFinish={signIn} className={classes.form} layout={VERTICAL} size={LARGE}>
        {/* Remove it */}
        {isLogin && <Button type="primary" danger onClick={setMockUser} style={{width: '100%'}}>SET MOCK USER (TEST BTN)</Button>}
        <h2 className={classes.title}>{authPage.title}</h2>
        {errorTitle && <div className={classes.errorTitle}>{errorTitle}</div>}
        {!isLogin &&
          <Form.Item 
            label={FormItemLabels.NICKNAME}
            validateStatus={statusNickname}
            help={helpNickname}
            className={classes.formItemInput}
          >
            <Input value={nickname} onChange={e => setNickname(e.target.value)}/>
          </Form.Item>
        }
        <Form.Item
          label={FormItemLabels.EMAIL}
          validateStatus={statusEmail}
          help={helpEmail}
          className={classes.formItemInput}
        >
          <Input value={email} onChange={e => setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item 
          label={FormItemLabels.PASSWORD}
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
          <Button type={BtnTypes.PRIMARY} htmlType={SUBMIT} size={LARGE} className={classes.btn}>
            {authPage.btnTitle}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;