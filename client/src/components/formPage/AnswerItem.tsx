import {FC, useState} from 'react';
import {Button, Checkbox} from 'antd';
import {IAnswer} from '../../models/form';
import classes from '../../styles/formPage/AnswerItem.module.less';
import {DeleteOutlined} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

interface AnswerItemProps {
  answer: IAnswer;
  isEditMode: boolean;
  index: number;
}

const AnswerItem: FC<AnswerItemProps> = ({answer, isEditMode, index}) => {
  const [checkedAnswer, setCheckedAnswer] = useState<boolean>(answer.isSelected);
  const [answerText, setAnswerText] = useState<string>(answer.title);

  const classAnswerItem = isEditMode ? classes.answerItemEdit : classes.answerItemPlay;
  const classAnswerText = checkedAnswer ? classes.answerTextChecked : classes.answerTextDefault;

  return (
    <li className={classAnswerItem}>
      {isEditMode ? 
        <>
          <div className={classes.marker}>{index}</div>
          <TextArea 
            value={answerText}
            onChange={e => setAnswerText(e.target.value)} 
            placeholder={`Answer ${index}`}
            rows={1}
          />
          <Button className={classes.btnDelete}><DeleteOutlined/></Button>
        </>
        :
        <Checkbox
          checked={checkedAnswer} 
          onChange={() => setCheckedAnswer(!checkedAnswer)}
          className={classes.checkboxItem}
        >
          <div className={classAnswerText}>{answerText}</div>
        </Checkbox>
      }
    </li>
  );
};

export default AnswerItem;