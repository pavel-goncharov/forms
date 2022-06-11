import {FC, useState} from 'react';
import {Avatar, Button, Collapse, Progress, Switch} from 'antd';
import classes from '../../styles/statistic/StatisticCollapse.module.less';
import {UserOutlined, PercentageOutlined} from '@ant-design/icons';
import {initQuestions, initAnswers} from '../../utils/initData';
import { IAnswer } from '../../models/form';

const StatisticCollapse: FC = () => {
  // number(false) / per cent(true)
  const [isPerCent, setIsPerSent] = useState<boolean>(true); 
  // доделай (1)
  const idQuestionRedux = 0; 

  const question = initQuestions[idQuestionRedux];
  // доделай (1)
  const answers = getAnswersQuestion(idQuestionRedux + 1, initAnswers) ;
  
  function getFormat(count: number, isPerCent: boolean): string {
    return isPerCent ? (count + '%') : `${count}`; 
  }

  function getAnswersQuestion(idQuestion: number, answers: IAnswer[]): IAnswer[] {
    return answers.filter(answer => answer.idQuestion === idQuestion);
  }

  function calcPercentAnswer(currentAnswerCountSelected: number, answers: IAnswer[]): number {
    // проверь правильность процента
    const arrCountSelected = answers.map(answer => answer.countSelected);
    const sumCountSelected = arrCountSelected.reduce((prevSum, currentValue) => prevSum + currentValue, 0);
    const currentAnswerPerCent = Math.floor(currentAnswerCountSelected * 100 / sumCountSelected);
    return currentAnswerPerCent;
  }
  
  return (
    <Collapse defaultActiveKey={['statistic']}>
      <Collapse.Panel 
        header="Statistic"
        key="statistic"
      >
        <div className={classes.question}>
          <div className={classes.questionNumber}>Question {question.id}</div>
          <div className={classes.questionTitle}>{question.title}</div>
        </div>
        <ul className={classes.answers}>
          {answers.map((answer, index) =>
            <li key={answer.id} className={classes.answer}>
              <div className={classes.answerBriefly}>
                <div className={classes.marker}>{index + 1}</div>
                <div className={classes.answerBody}>
                  <div className={classes.text}>{answer.title}</div>
                  <Progress percent={answer.countSelected} className={classes.progress}
                    format={() => getFormat(answer.countSelected, isPerCent)}
                  />
                </div>
              </div>
              <div className={classes.buttons}>
                <Switch 
                  checked={isPerCent}
                  onChange={() => setIsPerSent(!isPerCent)}
                  unCheckedChildren={<UserOutlined/>}
                  checkedChildren={<PercentageOutlined/>}
                />
                <Button className={classes.button}>Show answer</Button>
                <Button className={classes.button}>Hide users</Button>
              </div>
              <div className={classes.answerComplete}>
                <div>{answer.title}</div>
              </div>
              <ul className={classes.users}>
                <li className={classes.user}>
                  <Avatar shape="square" size={18} className={classes.avatar}>{'pawell'[0].toUpperCase()}</Avatar>
                  <span className={classes.nickname}>Pawell</span>
                  <span>,</span>
                </li>
              </ul>
            </li> 
          )}          
        </ul>
      </Collapse.Panel>
    </Collapse>
  );
};

export default StatisticCollapse;