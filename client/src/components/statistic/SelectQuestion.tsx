import {FC} from 'react';
import {Checkbox} from 'antd';
import classes from '../../styles/statistic/SelectQuestion.module.less';

const SelectQuestion: FC = () => {
  return (
    <ul className={classes.questions}>
      <li className={classes.question}>
        <Checkbox className={classes.checkbox}>
          <div className={classes.text}>
            <div className={classes.questionNumber}>Question 0</div>
            <div className={classes.questionTitle}>Question0Title</div>
          </div> 
        </Checkbox>
      </li>
    </ul>
  );
};

export default SelectQuestion;