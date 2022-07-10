import {FC} from 'react';
import {Collapse, Empty, Spin, Switch} from 'antd';
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
        {questions?.map((question, index) => 
          <QuestionStatistic question={question} index={index + 1} key={question.id}/>
        )}
        {!questions.length && <Empty style={{padding: '15px'}}/>}
        {/* {!questions?.length && 
          // isLoading &&
          // <Spin size="large" style={{padding: '15px'}}/>
        } */}
      </Collapse.Panel>
    </Collapse>
  );
};

export default StatisticCollapse;