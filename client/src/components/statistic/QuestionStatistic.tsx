import {FC} from 'react';
import {IQuestionStatistic} from '../../types/statistic';
import classes from '../../styles/statistic/QuestionStatistic.module.less';
import AnswerStatistic from './AnswerStatistic';

interface Props {
  question: IQuestionStatistic;
}

const QuestionStatistic: FC<Props> = ({question}) => {
  return (
    <>  
      <div className={classes.question}>
        <div className={classes.questionNumber}>Question.</div>
        <div className={classes.questionTitle}>{question.title}</div>
      </div>
      <ul className={classes.answers}>
        {question.answers.map((answer, index) => 
          <AnswerStatistic answer={answer} index={index + 1} key={answer.id}/>
        )}
      </ul>
    </>
  );
};

export default QuestionStatistic;