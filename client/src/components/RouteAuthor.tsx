import {message, Spin} from 'antd';
import {FC, useEffect} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useCheckIsAuthorFormQuery} from '../api/endPoints/form';
import {AUTHOR_WARNING, LARGE} from '../constants/layout';
import {RoutePaths} from '../constants/routes';
import {useGetFormId} from '../hooks/useGetFormId';
import classes from '../styles/general/RouteAuthor.module.less';

const RouteAuthor: FC = () => {
  const formId = useGetFormId();

  const {data: isAuthor, isLoading} = useCheckIsAuthorFormQuery(formId);

  useEffect(() => {
    if(!isLoading && !isAuthor) message.warning(AUTHOR_WARNING);
  }, [isLoading, isAuthor]);
  
  if(isLoading) return <div className={classes.containerSpin}><Spin size={LARGE}/></div>;

  return (!isLoading && isAuthor) ? <Outlet/> : <Navigate to={RoutePaths.CATALOG}/>;
};

export default RouteAuthor;