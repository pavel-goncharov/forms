import {message, Spin} from 'antd';
import {FC, useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {PlayFormCheckMessages} from '../../types/play';
import Play from '../../pages/Play';
import {LARGE} from '../../constants/layout';
import {getIsPassedWarning, getNoQuestionsWarning} from '../../utils/messages';
import classes from '../../styles/play/RouterPlay.module.less';
import {RoutePaths} from '../../constants/routes';
import {useCheckCorrectPassFormQuery} from '../../api/endPoints/play';
import {useFetchFormTitleQuery} from '../../api/endPoints/form';

const RoutePlay: FC = () => {
  const {id} = useParams();
  const formId = Number(id);

  const {data: playRes, isLoading} = useCheckCorrectPassFormQuery(formId);
  const {data: formTitle, isLoading: isLoadingTitle} = useFetchFormTitleQuery(formId);

  useEffect(() => {
    if(!isLoading && !isLoadingTitle && playRes?.message === PlayFormCheckMessages.NO_QUESTIONS) {
      const noQuestionsWarning = getNoQuestionsWarning(formTitle!);
      message.warning(noQuestionsWarning);
    }
    if(!isLoading && !isLoadingTitle && playRes?.message === PlayFormCheckMessages.IS_PASSED) {
      const isPassedWarning = getIsPassedWarning(formTitle!);
      message.warning(isPassedWarning);
    }
  }, [isLoading, isLoadingTitle, playRes?.message, formTitle]);

  function checkIsCorrectFormPlay() {
    switch(playRes?.message) {
      case PlayFormCheckMessages.NO_QUESTIONS:
        return false;
      case PlayFormCheckMessages.IS_PASSED:
        return false;
      case PlayFormCheckMessages.CORRECT:
        return true;
    }
  }

  const isCorrectFormPlay = checkIsCorrectFormPlay(); 

  if(isLoading) return <div className={classes.containerSpin}><Spin size={LARGE}/></div>;

  return (!isLoading && isCorrectFormPlay) ? <Play/> : <Navigate to={RoutePaths.CATALOG}/>;
};

export default RoutePlay;