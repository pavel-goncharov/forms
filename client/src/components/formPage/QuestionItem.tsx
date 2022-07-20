import {Button, Collapse, message, Popconfirm} from 'antd';
import {FC, ReactNode, useState} from 'react';
import {IAnswer, IQuestion} from '../../types/form';
import AnswerItem from './AnswerItem';
import classes from '../../styles/formPage/QuestionItem.module.less';
import {DeleteOutlined} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import {useActions} from '../../hooks/useActions';
import {BtnTitles, BtnKeys, popConfirmArgs, popConfirmPlacements, textAreaRows} from '../../constants/layout';
import {getTitlePopConfirmDeleteQuestion} from '../../utils/messages';

interface Props {
  question: IQuestion;
  remove?: (id: number) => void;
  index: number;
  isEditMode: boolean;  
}

const QuestionItem: FC<Props> = ({question, remove, index, isEditMode}) => {
  const {deleteQuestion, updateQuestion, addAnswer} = useActions();

  const [title, setTitle] = useState<string>(question.title);
  const [answerItems, setAnswerItems] = useState<IAnswer[]>(question.answers);

  const titlePopConfirmDeleteQuestion: string = getTitlePopConfirmDeleteQuestion(index);

  const editHeaderButton: ReactNode =
    <div onClick={e => e.stopPropagation()}>
      <Popconfirm
        placement={popConfirmPlacements.BOTTOM_RIGHT}
        title={titlePopConfirmDeleteQuestion}
        onConfirm={handlerRemove}
        okText={popConfirmArgs.okText}
        cancelText={popConfirmArgs.cancelText}
        key={BtnKeys.DELETE}
        >
          <Button><DeleteOutlined/></Button>
        </Popconfirm>
    </div>; 

  const extra: ReactNode | null = isEditMode ? editHeaderButton : null;
  const classQuestionItem = isEditMode ? classes.questionItemEdit : classes.questionItemPlay; 

  function handlerRemove(): void {
    deleteQuestion(question.id);
    remove!(question.id);
  }

  function handlerUpdate(newValue: string): void {
    setTitle(newValue);
    const updatedQuestion = {
      id: question.id,
      newValue
    };
    updateQuestion(updatedQuestion);
  }

  function newAnswer(): void {
    const temporaryId = Number(new Date());
    const answer = {id: temporaryId, title: '', isChecked: false};
    const argAction = {
      questionId: question.id,
      newAnswer: answer
    };
    addAnswer(argAction);
    setAnswerItems([...answerItems, answer]);
  }

  function removeAnswer(id: number): void {
    setAnswerItems(answerItems.filter(answer => answer.id !== id));
    const textMessage = 'Answer deleted';
    message.success(textMessage);
  }
  
  return (
    <Collapse 
      defaultActiveKey={[question.id]}
      className={classQuestionItem}
    >
      <Collapse.Panel 
        header={`Question ${index}`}
        key={question.id}
        extra={extra}
      >
        <div className={classes.textContainer}>
          {isEditMode ?
            <TextArea 
              value={title}
              onChange={e => handlerUpdate(e.target.value)} 
              placeholder={`Question ${index}`}
              rows={textAreaRows.QUESTION}
            />
            :
            <>{title}</>
          }
        </div>        
        <ul className={classes.answers}>
          {answerItems?.map((answer, index) => 
            <AnswerItem
              questionId={question.id} 
              answer={answer}
              remove={removeAnswer}
              isEditMode={isEditMode}
              index={index + 1}
              key={answer.id}
            />
          )}
          {isEditMode && <Button onClick={newAnswer}>{BtnTitles.ADD_ANSWER}</Button>}
        </ul>
      </Collapse.Panel>
    </Collapse>
  );
};

export default QuestionItem;