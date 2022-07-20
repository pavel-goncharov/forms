import {FC, useEffect} from 'react';
import {Collapse, Empty, Spin, Switch} from 'antd';
import QuestionStatistic from './QuestionStatistic';
import {UserOutlined, PercentageOutlined} from '@ant-design/icons';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useActions} from '../../hooks/useActions';
import {useParams} from 'react-router-dom';
import classes from '../../styles/statistic/ResultStatistic.module.less';
import {CollapseHeaders, CollapseKeys, LARGE, SwitchContents} from '../../constants/layout';
import {useFetchAllStatisticQuery} from '../../api/endPoints/statistic';

const ResultStatistic: FC = () => {
  const {id} = useParams();
  const formId = Number(id);

  const {data: allStatisticQuestions, isLoading} = useFetchAllStatisticQuery(formId);

  const questions = useAppSelector(state => state.statistic.statisticQuestions);
  const isPerCent = useAppSelector(state => state.statistic.isPerCent);
  const isShowCompleteAnswer = useAppSelector(state => state.statistic.isShowCompleteAnswer);
  const isShowUsers = useAppSelector(state => state.statistic.isShowUsers);
  const {changeIsPerCent, changeIsShowCompleteAnswer, changeIsShowUsers , setStatisticQuestions} = useActions();

  useEffect(() => {
    if(!isLoading && allStatisticQuestions) {
      setStatisticQuestions(allStatisticQuestions);
    }
  }, [isLoading]);
  
  return (
    <Collapse 
      defaultActiveKey={[CollapseKeys.STATISTIC]}
      >
      <Collapse.Panel 
        header={CollapseHeaders.STATISTIC}
        key={CollapseKeys.STATISTIC}
      >
        <div className={classes.buttons}>
          <Switch
            checked={isPerCent}
            onChange={() => changeIsPerCent()} 
            unCheckedChildren={<UserOutlined/>}
            checkedChildren={<PercentageOutlined/>}
          />
          <Switch
            checked={isShowCompleteAnswer}
            onChange={() => changeIsShowCompleteAnswer()}
            unCheckedChildren={SwitchContents.A}
            checkedChildren={SwitchContents.A}
          />
          <Switch
            checked={isShowUsers}
            onChange={() => changeIsShowUsers()}
            unCheckedChildren={<UserOutlined/>}
            checkedChildren={<UserOutlined/>}
          />
        </div>
        {questions?.map(question => 
         <QuestionStatistic question={question} key={question.id}/>
        )}
        {!questions.length && <Empty className={classes.empty}/>}
        {!questions.length && isLoading && <Spin size={LARGE} className={classes.spin}/>}
      </Collapse.Panel>
    </Collapse>
  );
};

export default ResultStatistic;