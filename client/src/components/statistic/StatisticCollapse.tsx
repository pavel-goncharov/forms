import {FC} from 'react';
import {Collapse, Switch} from 'antd';
import QuestionStatistic from './QuestionStatistic';
import {UserOutlined, PercentageOutlined} from '@ant-design/icons';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useActions } from '../../hooks/useActions';


interface StatisticCollapseProps {
  formId: number;
}

const StatisticCollapse: FC<StatisticCollapseProps> = ({formId}) => {
  const questions = useAppSelector(state => state.statistic.statisticQuestions);
  const isPerCent = useAppSelector(state => state.statistic.isPerCent);
 

  const {changeIsPerCent} = useActions(); 

  
  return (
    <Collapse 
      defaultActiveKey={['statistic']}
      >
      <Collapse.Panel 
        header="Statistic"
        key="statistic"
        extra={
          <div onClick={e => e.stopPropagation()}>
            <Switch
              checked={isPerCent}
              onChange={() => changeIsPerCent()} 
              unCheckedChildren={<UserOutlined/>}
              checkedChildren={<PercentageOutlined/>}
            />
          </div>
        }
      >
        {}
        {questions.length ? 
          questions?.map((question, index) => 
            <QuestionStatistic question={question} index={index + 1} key={question.id}/>
          ) 
          : 
          <div>loading...</div>
        }
      </Collapse.Panel>
    </Collapse>
  );
};

export default StatisticCollapse;