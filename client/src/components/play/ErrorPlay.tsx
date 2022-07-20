import {FC} from 'react';
import {useActions} from '../../hooks/useActions';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from '../../styles/formPage/ErrorFormPage.module.less';
import {CloseCircleOutlined, StopOutlined, CloseOutlined} from '@ant-design/icons';
import {useFetchFormTitleQuery} from '../../api/endPoints/form';

interface Props {
  formId: number;
}

const ErrorPlay: FC<Props> = ({formId}) => {
  const {data: titleForm} = useFetchFormTitleQuery(formId);

  const questions = useAppSelector(state => state.play.notSelectedQuestions);
  const {setNotSelectedQuestions, setIsErrorPlay} = useActions();

  function handlerHideErrorEdit(): void {
    setIsErrorPlay(false);
    setNotSelectedQuestions([]);
  }

  return (
    <div className={classes.errorEdit}>
      <div className={classes.titles}>
        <div>
          <p className={classes.title}>Form passing error</p>
          <p className={classes.subtitle}>Your passing {titleForm} can't be send because it contains invalid data.</p>
        </div>
        <CloseOutlined onClick={handlerHideErrorEdit} className={classes.closeError}/>
      </div>
      <ul className={classes.info}>
        {!!questions.length && <li className={classes.infoItem}>
          <p className={classes.infoTitle}>
            <CloseCircleOutlined className={classes.icon}/>
            <span className={classes.iconTitle}>At least one answer must be selected in the question.</span>
          </p>
          <p className={classes.errorTitle}>Error in question:</p>
          <ul>{questions.map(indexQuestion =>
            <li className={classes.errorItem} key={indexQuestion}>
              <StopOutlined className={classes.errorItemMarker}/>
              <span>question {indexQuestion}</span>
            </li> 
          )}</ul>
        </li>}
      </ul>
    </div>
  );
};

export default ErrorPlay;