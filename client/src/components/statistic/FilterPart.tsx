import {FC, useState} from 'react';
import classes from '../../styles/statistic/FilterPart.module.less';
import {FilterOutlined, EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import { Empty, Switch } from 'antd';
import SelectQuestion from './SelectQuestion';
import SelectUser from './SelectUser';
import { IFilterQuestion, IFilterUser } from '../../models/statistic';
import { FilterParts } from '../../utils/constants';

interface FilterPartProps {
  title: string;
  filterQuestions?: IFilterQuestion[];
  filterUsers?: IFilterUser[];
}

const FilterPart: FC<FilterPartProps> = ({title, filterQuestions, filterUsers}) => {

  const isQuestionFilter: boolean = (title === FilterParts.QUESTIONS);
  const styleTitle = isQuestionFilter ? classes.titleQuestion : classes.titleUser;

  const [isAll, setIsAll] = useState<boolean>(true);

  const [isShow, setIsShow] = useState<boolean>(isQuestionFilter);
  const classFilterList = isShow ? classes.listItems : classes.hidden;
  
  function handlerIsShow(newValue: boolean) {
    setIsShow(newValue);
  }
  
  return (
    <div>
      <div className={styleTitle}>
        <div>
          <FilterOutlined/>
          <span className={classes.text}>{title}</span>
        </div>
        <div className={classes.switches}>
          <Switch
            checked={isAll}
            onChange={() => setIsAll(!isAll)}
            checkedChildren='All'
            unCheckedChildren='All'
          />
          <Switch
            checked={isShow}
            onChange={() => handlerIsShow(!isShow)}
            checkedChildren={<EyeOutlined/>}
            unCheckedChildren={<EyeInvisibleOutlined/>}
            className={classes.switchEye}
          />
        </div>
      </div>
      <ul className={classFilterList}>
        {isQuestionFilter && filterQuestions?.map((question, index) => 
          <SelectQuestion 
            question={question}
            isAll={isAll}
            index={index} 
            key={question.id}
          />
        )}
        {isQuestionFilter && !filterQuestions?.length && <Empty style={{padding: '15px'}}/>}
        {!isQuestionFilter && filterUsers?.map((user, index) => 
          <SelectUser 
            user={user}
            isAll={isAll}
            index={index}
            key={user.id}
          />
        )}
        {!isQuestionFilter && !filterUsers?.length && <Empty style={{padding: '15px'}}/>}
      </ul>
    </div>
  );
};

export default FilterPart;