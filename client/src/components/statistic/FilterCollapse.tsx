import {Collapse} from 'antd';
import {FC} from 'react';
import SelectQuestion from './SelectQuestion';
import SelectUsers from './SelectUsers';
import FilterPart from './FilterPart';


const Filter: FC = () => {
  return (
    <Collapse>
      <Collapse.Panel header="Filter" key="filter">
        <FilterPart title='Questions' content={<SelectQuestion/>}></FilterPart>
        <FilterPart title='Users' content={<SelectUsers/>}></FilterPart>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Filter;