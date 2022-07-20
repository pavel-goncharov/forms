import {FC, useState} from 'react';
import classes from '../../styles/statistic/FilterPart.module.less';
import {FilterOutlined, EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import {Empty, Switch} from 'antd';
import SelectQuestion from './SelectQuestion';
import SelectUser from './SelectUser';
import {IFilterItem} from '../../types/statistic';
import {FilterParts, SwitchContents} from '../../constants/layout';

interface Props {
  title: string;
  filterQuestions?: IFilterItem[];
  filterUsers?: IFilterItem[];
}

const FilterPart: FC<Props> = ({title, filterQuestions, filterUsers}) => {
  const [isAll, setIsAll] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(true);

  const classFilterList = isShow ? classes.listItems : classes.hidden;
  const isQuestionFilter: boolean = (title === FilterParts.QUESTIONS);
  
  return (
    <div>
      <div className={classes.title}>
        <div>
          <FilterOutlined/>
          <span className={classes.text}>{title}</span>
        </div>
        <div className={classes.switches}>
          <Switch
            checked={isAll}
            onChange={() => setIsAll(!isAll)}
            checkedChildren={SwitchContents.ALL}
            unCheckedChildren={SwitchContents.ALL}
          />
          <Switch
            checked={isShow}
            onChange={() => setIsShow(!isShow)}
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
        {isQuestionFilter && !filterQuestions?.length && <Empty className={classes.empty}/>}
        {!isQuestionFilter && filterUsers?.map((user, index) => 
          <SelectUser 
            user={user}
            isAll={isAll}
            index={index}
            key={user.id}
          />
        )}
        {!isQuestionFilter && !filterUsers?.length && <Empty className={classes.empty}/>}
      </ul>
    </div>
  );
};

export default FilterPart;