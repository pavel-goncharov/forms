import {FC} from 'react';
import {useActions} from '../../hooks/useActions';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from '../../styles/formPage/ErrorFormPage.module.less';
import {CloseCircleOutlined, StopOutlined, CloseOutlined} from '@ant-design/icons';
import {useFetchFormTitleQuery} from '../../api/endPoints/form';

interface Props {
  formId: number;
}

const ErrorEdit: FC<Props> = ({formId: id}) => {
  const {data: titleForm} = useFetchFormTitleQuery(id);

  const info = useAppSelector(state => state.edit.infoErrorsEdit);
  const {setInfoErrorsEdit, setIsErrorEdit} = useActions();

  function handlerHideErrorEdit(): void {
    setIsErrorEdit(false);
    setInfoErrorsEdit(null);
  }

  return (
    <div className={classes.errorEdit}>
      <div className={classes.titles}>
        <div>
          <p className={classes.title}>Form editing error</p>
          <p className={classes.subtitle}>{titleForm} can\'t be saved because it contains invalid data.</p>
        </div>
        <CloseOutlined onClick={handlerHideErrorEdit} className={classes.closeError}/>
      </div>
      <ul className={classes.info}>
        {!info?.isHaveQuestion && <li className={classes.infoItem}>
          <p className={classes.infoTitle}>
            <CloseCircleOutlined className={classes.icon}/>
            <span className={classes.iconTitle}>The form must contain at least 1 question.</span>
          </p>
          <p className={classes.errorTitle}>Error: {titleForm} has no questions.</p>
        </li>}
        {!!info?.notMinNumberAnswers.length && <li className={classes.infoItem}>
          <p className={classes.infoTitle}>
            <CloseCircleOutlined className={classes.icon}/>
            <span className={classes.iconTitle}>The form question must have at least 2 answers.</span>
          </p>
          <p className={classes.errorTitle}>Error in question:</p>
          <ul>{info?.notMinNumberAnswers.map(indexQuestion =>
            <li className={classes.errorItem} key={indexQuestion}>
              <StopOutlined className={classes.errorItemMarker}/>
              <span>question {indexQuestion}</span>
            </li> 
          )}</ul>
        </li>}
        {!!info?.emptyTitleQuestions.length && <li className={classes.infoItem}>
          <p className={classes.infoTitle}>
            <CloseCircleOutlined className={classes.icon}/>
            <span className={classes.iconTitle}>The title of question must be completed.</span> 
          </p>
          <p className={classes.errorTitle}>Error in question:</p>
          <ul>{info?.emptyTitleQuestions.map(indexQuestion => 
            <li className={classes.errorItem} key={indexQuestion}>
              <StopOutlined className={classes.errorItemMarker}/>
              <span>question {indexQuestion}</span>
            </li> 
          )}</ul>
        </li>}
        {!!info?.emptyTitleAnswers.length && <li className={classes.infoItem}>
          <p className={classes.infoTitle}>
            <CloseCircleOutlined className={classes.icon}/>
            <span className={classes.iconTitle}>The title of answer must be completed.</span>
          </p>
          <p className={classes.errorTitle}>Error in answer:</p>
          <ul>{info?.emptyTitleAnswers.map((emptyItem, index) =>
            <li className={classes.errorItem} key={index}>
              <StopOutlined className={classes.errorItemMarker}/>
              <span>question {emptyItem.question} answer {emptyItem.answer}</span>
            </li>
          )}</ul>
        </li>}
      </ul>
    </div>
  );
};

export default ErrorEdit;