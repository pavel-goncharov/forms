import {Button, Collapse} from 'antd';
import {FC} from 'react';
import {useActions} from '../../hooks/useActions';
import {BtnTitles, CollapseHeaders, CollapseKeys, FilterParts} from '../../constants/layout';
import FilterPart from './FilterPart';
import {SearchOutlined} from '@ant-design/icons';
import {useAppSelector} from '../../hooks/useAppSelector';
import {IArgCalcStatistic} from '../../types/statistic';
import classes from '../../styles/statistic/Filter.module.less';
import {getFilterFormatForServer} from '../../utils/statistic';
import {useCalcStatisticMutation, useFetchFilterQuestionsQuery, useFetchFilterUsersQuery} from '../../api/endPoints/statistic';

interface Props {
  formId: number;
}

const Filter: FC<Props> = ({formId}) => {
  const {data: filterQuestions} = useFetchFilterQuestionsQuery(formId);  
  const {data: filterUsers} = useFetchFilterUsersQuery(formId);
  const [calcStatistic] = useCalcStatisticMutation();

  const selectedQuestions = useAppSelector(state => state.statistic.selectedQuestions);
  const selectedUsers = useAppSelector(state => state.statistic.selectedUsers);
  const {setStatisticQuestions} = useActions();

  async function searchStatistic(): Promise<void> {  
    const filter = getFilterFormatForServer(selectedQuestions, selectedUsers);
    const argReq: IArgCalcStatistic = {id: formId, filter};
    const statisticQuestions = await calcStatistic(argReq).unwrap();
    setStatisticQuestions(statisticQuestions);
  }
  
  return (
    <Collapse defaultActiveKey={CollapseKeys.FILTER}>
      <Collapse.Panel
        header={CollapseHeaders.FILTER} 
        key={CollapseKeys.FILTER}
      >
        <FilterPart title={FilterParts.QUESTIONS} filterQuestions={filterQuestions}/>
        <FilterPart title={FilterParts.USERS} filterUsers={filterUsers}/>       
        <Button onClick={searchStatistic} className={classes.searchBtn}>
          <span>
            <SearchOutlined/>
            <span className={classes.textSearchBtn}>{BtnTitles.SEARCH}</span>
          </span>
        </Button>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Filter;