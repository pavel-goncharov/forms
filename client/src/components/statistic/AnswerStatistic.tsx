import {FC, useState} from 'react';
import classes from '../../styles/statistic/AnswerStatistic.module.less';
import {UserOutlined} from '@ant-design/icons';
import {Progress, Switch} from 'antd';
import {IAnswerStatistic} from '../../models/statistic';
import UserStatistic from './UserStatistic';
import {useAppSelector} from '../../hooks/useAppSelector';

interface AnswerStatisticProps {
  answer: IAnswerStatistic,
  index: number;
}

const AnswerStatistic: FC<AnswerStatisticProps> = ({answer, index}) => {

  const isPerCent = useAppSelector(state => state.statistic.isPerCent);

  const [isShowCompleteAnswer, setIsShowCompleteAnswer] = useState<boolean>(false);
  const [isShowUsers, setIsShowUsers] = useState<boolean>(false);

  const classCompleteAnswer = isShowCompleteAnswer ? classes.answerComplete : classes.hidden;
  const classUsers = isShowUsers ? classes.users : classes.hidden; 


  function getFormat(isPerCent: boolean): string {
    return isPerCent ? (answer.perCent + '%') : `${answer.number}`; 
  }
  
  return (
    <li key={answer.id} className={classes.answer}>
      <div className={classes.answerBriefly}>
        <div className={classes.marker}>{index}</div>
        <div className={classes.answerBody}>
          <div className={classes.text}>{answer.title}</div>
          <Progress percent={answer.perCent} className={classes.progress}
            format={() => getFormat(isPerCent)}
          />
        </div>
      </div>
      <div className={classes.buttons}>
        <Switch
          checked={isShowCompleteAnswer}
          onChange={() => setIsShowCompleteAnswer(!isShowCompleteAnswer)}
          unCheckedChildren='A'
          checkedChildren='A'
        />
        <Switch
          checked={isShowUsers}
          onChange={() => setIsShowUsers(!isShowUsers)}
          unCheckedChildren={<UserOutlined/>}
          checkedChildren={<UserOutlined/>}
        />
      </div>
      <div className={classCompleteAnswer}>{answer.title}</div>
      <ul className={classUsers}>
        {answer.users.length ? 
          answer.users.map(nickname => 
            <UserStatistic nickname={nickname} key={nickname}/>
          )
          :
          <li>Answer {index} is not selected.</li>
        }
      </ul>
    </li>
  );
};

export default AnswerStatistic;