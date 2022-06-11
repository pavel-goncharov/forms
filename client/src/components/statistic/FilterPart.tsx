import {FC, ReactNode} from 'react';
import classes from '../../styles/statistic/FilterPart.module.less';
import {FilterOutlined, EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import { Switch } from 'antd';

interface FilterPartProps {
  title: string;
  content: ReactNode;
}

const FilterPart: FC<FilterPartProps> = ({title, content}) => {
  return (
    <div>
      <div className={classes.title}>
        <div>
          <FilterOutlined/>
          <span className={classes.text}>{title}</span>
        </div>
        <div className={classes.switches}>
          <Switch
            checkedChildren='All'
            unCheckedChildren='All'
            defaultChecked
          />
          <Switch
            checkedChildren={<EyeOutlined/>}
            unCheckedChildren={<EyeInvisibleOutlined/>}
            defaultChecked
            className={classes.switchEye}
          />
        </div>
      </div>
      {content}
    </div>
  );
};

export default FilterPart;