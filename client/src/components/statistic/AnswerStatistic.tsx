import {FC} from 'react';
import classes from '../../styles/statistic/AnswerStatistic.module.less';
import {Progress} from 'antd';
import {IAnswerStatistic} from '../../types/statistic';
import UserStatistic from './UserStatistic';
import {useAppSelector} from '../../hooks/useAppSelector';

interface Props {
  answer: IAnswerStatistic,
  index: number;
}

const AnswerStatistic: FC<Props> = ({answer, index}) => {

  const isPerCent = useAppSelector(state => state.statistic.isPerCent);
  const isShowCompleteAnswer = useAppSelector(state => state.statistic.isShowCompleteAnswer);
  const isShowUsers = useAppSelector(state => state.statistic.isShowUsers);

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
      <div className={classCompleteAnswer}>{answer.title}</div>
      <ul className={classUsers}>
        {answer.users.length ? 
          answer.users.map((nickname, index) => 
            <UserStatistic 
              nickname={nickname}
              isLast={index === answer.users.length - 1}
              key={nickname}
            />
          )
          :
          <li>Answer {index} is not selected.</li>
        }
      </ul>
    </li>
  );
};

export default AnswerStatistic;