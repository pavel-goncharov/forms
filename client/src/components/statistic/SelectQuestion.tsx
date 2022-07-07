import {FC, useEffect, useState} from 'react';
import {Checkbox} from 'antd';
import classes from '../../styles/statistic/SelectQuestion.module.less';
import { IFilterQuestion } from '../../models/statistic';
import { useActions } from '../../hooks/useActions';

interface SelectQuestionProps {
  question: IFilterQuestion;
  isAll: boolean;
  index: number;
}

const SelectQuestion: FC<SelectQuestionProps> = ({question, isAll, index}) => {
  const {addSelectedQuestion, deleteSelectedQuestion} = useActions();

  const [isSelected, setIsSelected] = useState<boolean>(isAll);
  
  useEffect(() => {
    handlerIsSelected(isAll);
  }, [isAll]);

  function handlerIsSelected(newValue: boolean) {
    setIsSelected(newValue);
    if(newValue) addSelectedQuestion(question);
    else deleteSelectedQuestion(question.id);
  }
  
  return ( 
    <li key={question.id} className={classes.question}>
      <Checkbox
        checked={isSelected}
        onChange={() => handlerIsSelected(!isSelected)} 
        className={classes.checkbox}
      >
        <div className={classes.text}>
          <div className={classes.questionNumber}>Question {index + 1}</div>
          <div className={classes.questionTitle}>{question.title}</div>
        </div> 
      </Checkbox>
    </li>
  );
};

export default SelectQuestion;