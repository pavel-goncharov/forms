import {Button, Collapse} from 'antd';
import {FC, ReactNode, useState} from 'react';
import { IAnswer, IQuestion } from '../../models/form';
import { initAnswers } from '../../utils/initData';
import AnswerItem from './AnswerItem';
import classes from '../../styles/formPage/QuestionItem.module.less';
import {DeleteOutlined, PlusSquareOutlined} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';


interface QuestionItemProps {
  question: IQuestion;
  isEditMode: boolean;  
}

const QuestionItem: FC<QuestionItemProps> = ({question, isEditMode}) => {

  const [questionText, setQuestionText] = useState<string>(question.title);
  
  function getAnswersQuestion(answers: IAnswer[], questionId: number): IAnswer[] {
    return answers.filter(answer => answer.idQuestion === questionId);
  }

  const headerButtons: ReactNode[] = [
    <Button key="delete"><DeleteOutlined/></Button>,
    <Button key="add"><PlusSquareOutlined/></Button>,
  ]; 

  const extra: ReactNode[] | null = isEditMode ? headerButtons : null;
  const classQuestionItem = isEditMode ? classes.questionItemEdit : classes.questionItemPlay; 

  const answerItems: IAnswer[] = getAnswersQuestion(initAnswers, question.id);

  return (
    <Collapse 
      defaultActiveKey={[1, 2]}
      className={classQuestionItem}
    >
      <Collapse.Panel 
        header={'Question\n' + question.id}
        key={question.id}
        extra={extra}
      >
        <div className={classes.textContainer}>
          {isEditMode ?
            <TextArea 
              value={questionText}
              onChange={e => setQuestionText(e.target.value)} 
              placeholder={`Question ${question.id}`}
              rows={2}
            />
            :
            <>{questionText}</>
          }
        </div>        
        <ul className={classes.answers}>
          {answerItems.map((answer, index) => 
            <AnswerItem answer={answer} isEditMode={isEditMode} index={index + 1} key={answer.id}/>
          )}
          {isEditMode && <Button>Add answer</Button>}
        </ul>
      </Collapse.Panel>
    </Collapse>
  );
};

export default QuestionItem;