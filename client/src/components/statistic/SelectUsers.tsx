import {FC} from 'react';
import {Avatar, Checkbox} from 'antd';
import classes from '../../styles/statistic/SelectUsers.module.less';
import {NumberOutlined} from '@ant-design/icons';
import { initNickname } from '../../utils/initData';

const SelectQuestion: FC = () => {
  return (
    <ul className={classes.users}>
      <li className={classes.user}>
        <Checkbox className={classes.checkbox}>
          <div className={classes.content}>
            <div className={classes.number}>
              <NumberOutlined/>
              <span>1</span>
            </div>
            <Avatar shape="square" size={18} className={classes.avatar}>{initNickname[0].toUpperCase()}</Avatar>
            <div className={classes.nickname}>Pawell</div>
          </div>
        </Checkbox>
      </li>
    </ul>
  );
};

export default SelectQuestion;