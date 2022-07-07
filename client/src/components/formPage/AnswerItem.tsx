import {FC, useState} from 'react';
import {Button, Checkbox, Popconfirm} from 'antd';
import {IAnswerFormPage} from '../../models/form';
import classes from '../../styles/formPage/AnswerItem.module.less';
import {DeleteOutlined} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useActions } from '../../hooks/useActions';

interface AnswerItemProps {
  questionId: number;
  answer: IAnswerFormPage;
  remove: (id: number) => void;
  isEditMode: boolean;
  index: number;
}

const AnswerItem: FC<AnswerItemProps> = ({questionId, answer, remove, isEditMode, index}) => {
  const {setIsCheckedAnswer, deleteAnswer, updateAnswer} = useActions();
  
  const [isChecked, setIsChecked] = useState<boolean>(answer.isChecked!);
  const [title, setTitle] = useState<string>(answer.title);

  const classItem = isEditMode ? classes.answerItemEdit : classes.answerItemPlay;
  const classText = isChecked ? classes.answerTextChecked : classes.answerTextDefault;

  function changeIsCheckedAnswer(newValue: boolean) {
    setIsChecked(newValue);
    const dataAnswer = {
      questionId,
      answerId: answer.id, 
    };
    setIsCheckedAnswer(dataAnswer);
  }

  function handlerRemove() {
    const argAction = {
      questionId,
      id: answer.id
    };
    deleteAnswer(argAction);
    remove(answer.id)
  }

  function handlerUpdate(newValue: string) {
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
            rows={1}
          />
          <Popconfirm
            placement="left"
            title={`Are you sure to delete the answer ${index}?`}
            onConfirm={handlerRemove}
            okText="Yes"
            cancelText="No"
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