import {FC} from 'react';
import { IQuestionStatistic } from '../../models/statistic';
import classes from '../../styles/statistic/QuestionStatistic.module.less';
import AnswerStatistic from './AnswerStatistic';

interface QuestionStatisticProps {
  question: IQuestionStatistic;
  index: number;
}

const QuestionStatistic: FC<QuestionStatisticProps> = ({question, index}) => {
  return (
    <>  
      <div className={classes.question}>
        <div className={classes.questionNumber}>Question {index}</div>
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