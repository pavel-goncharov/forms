import {Button, Collapse} from 'antd';
import {FC, useEffect} from 'react';
import statisticApi from '../../api/extended/statisticApi';
import {useActions} from '../../hooks/useActions';
import {FilterCollapsePanel, FilterParts} from '../../utils/constants';
import FilterPart from './FilterPart';
import {SearchOutlined} from '@ant-design/icons';
import {useAppSelector} from '../../hooks/useAppSelector';
import {calcStatisticArg, IFilterQuestion, IFilterUser} from '../../models/statistic';


interface FilterProps {
  formId: number;
}

const Filter: FC<FilterProps> = ({formId}) => {
  const {data: filterQuestions} = statisticApi.useFetchFilterQuestionsQuery(formId);  
  const {data: filterUsers} = statisticApi.useFetchFilterUsersQuery(formId);
  const [calcStatistic] = statisticApi.useCalcStatisticMutation();

  const selectedQuestions = useAppSelector(state => state.statistic.selectedQuestions);
  const selectedUsers = useAppSelector(state => state.statistic.selectedUsers);

  const {setStatisticQuestions} = useActions();

  // ----------------------------------------------------------------------------------------
  useEffect(() => {
    if(selectedQuestions.length && selectedUsers.length) searchStatistic();
  }, []);

  async function searchStatistic() {
    console.log(selectedQuestions, selectedUsers);
    const filter = getFilterFormatForServer(selectedQuestions, selectedUsers);
    const argReq: calcStatisticArg = {id: formId, filter};
    const statisticQuestions = await calcStatistic(argReq).unwrap();
    setStatisticQuestions(statisticQuestions);
  }
  
  function getFilterFormatForServer(filterQuestions: IFilterQuestion[], filterUsers: IFilterUser[]) {
    const selectedQuestions = getArrayId(filterQuestions);
    const selectedUsers = getArrayId(filterUsers);
    const filter = {selectedQuestions, selectedUsers};
    return filter;
  } 

  function getArrayId(objArr: IFilterQuestion[] | IFilterUser[]): number[] {
    return objArr.map(obj => obj.id);
  } 
  return (
    <Collapse defaultActiveKey={FilterCollapsePanel.key}>
      <Collapse.Panel
        extra={
          <div onClick={e => e.stopPropagation()}>
            <Button onClick={() => searchStatistic()}>
              <SearchOutlined/>
            </Button>
          </div>
        } 
        header={FilterCollapsePanel.header} 
        key={FilterCollapsePanel.key}
      >
        <FilterPart title={FilterParts.QUESTIONS} filterQuestions={filterQuestions}/>
        <FilterPart title={FilterParts.USERS} filterUsers={filterUsers}/>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Filter;