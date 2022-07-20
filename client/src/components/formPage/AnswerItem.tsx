import {FC, useState} from 'react';
import {Button, Checkbox, Popconfirm} from 'antd';
import {IAnswer} from '../../types/form';
import classes from '../../styles/formPage/AnswerItem.module.less';
import {DeleteOutlined} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import {useActions} from '../../hooks/useActions';
import {popConfirmArgs, popConfirmPlacements, textAreaRows} from '../../constants/layout';
import {getTitlePopConfirmDeleteAnswer} from '../../utils/messages';

interface Props {
  questionId: number;
  answer: IAnswer;
  remove: (id: number) => void;
  isEditMode: boolean;
  index: number;
}

const AnswerItem: FC<Props> = ({questionId, answer, remove, isEditMode, index}) => {
  const {setIsCheckedAnswer, deleteAnswer, updateAnswer} = useActions();
  
  const [isChecked, setIsChecked] = useState<boolean>(answer.isChecked!);
  const [title, setTitle] = useState<string>(answer.title);

  const classItem = isEditMode ? classes.answerItemEdit : classes.answerItemPlay;
  const classText = isChecked ? classes.answerTextChecked : classes.answerTextDefault;

  const titlePopConfirmDeleteAnswer: string = getTitlePopConfirmDeleteAnswer(index);

  function changeIsCheckedAnswer(newValue: boolean): void {
    setIsChecked(newValue);
    const dataAnswer = {
      questionId,
      answerId: answer.id, 
    };
    setIsCheckedAnswer(dataAnswer);
  }

  function handlerRemove(): void {
    const argAction = {
      questionId,
      id: answer.id
    };
    deleteAnswer(argAction);
    remove(answer.id)
  }

  function handlerUpdate(newValue: string): void {
    setTitle(newValue);
    const updatedAnswer = {
      questionId,
      id: answer.id, 
      title: newValue
    };
    updateAnswer(updatedAnswer);
  }

  return (
    <li className={classItem}>
      {isEditMode ? 
        <>
          <div className={classes.marker}>{index}</div>
          <TextArea 
            value={title}
            onChange={e => handlerUpdate(e.target.value)} 
            placeholder={`Answer ${index}`}
            rows={textAreaRows.ANSWER}
          />
          <Popconfirm
            placement={popConfirmPlacements.LEFT}
            title={titlePopConfirmDeleteAnswer}
            onConfirm={handlerRemove}
            okText={popConfirmArgs.okText}
            cancelText={popConfirmArgs.cancelText}
          >
            <Button className={classes.btnDelete}><DeleteOutlined/></Button>
          </Popconfirm>
        </>
        :
        <Checkbox
          checked={isChecked} 
          onChange={() => changeIsCheckedAnswer(!isChecked)}
          className={classes.checkboxItem}
        >
          <div className={classText}>{title}</div>
        </Checkbox>
      }
    </li>
  );
};

export default AnswerItem;