import {FC} from 'react';
import Header from '../components/Header';
import QuestionItem from '../components/formPage/QuestionItem';
import {IQuestion} from '../models/form';
import {initQuestions} from '../utils/initData';
import classes from '../styles/formPage/FormPage.module.less';
import { useLocation } from 'react-router-dom';
import { Paths } from '../routes';
import { Button } from 'antd';

const FormPage: FC = () => {
  const location = useLocation();

  const isEditMode: boolean = location.pathname === Paths.EDIT; 
  
  const questionItems: IQuestion[] = initQuestions;
  return (
    <div className={classes.formPage}>
      <Header/>
      <div>
        {questionItems.map(question => 
          <QuestionItem
            question={question}
            isEditMode={isEditMode}
            key={question.id}
          />
        )}
      </div>
    </div>
  );
};

export default FormPage;