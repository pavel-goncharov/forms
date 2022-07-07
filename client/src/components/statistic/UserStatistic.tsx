import {FC} from 'react';
import classes from '../../styles/statistic/UserStatistic.module.less';
import {Avatar} from 'antd';

interface UserStatisticProps {
  nickname: string;
}

const UserStatistic: FC<UserStatisticProps> = ({nickname}) => {
  return (
    <li className={classes.user}>
      <Avatar shape="square" size={18} className={classes.avatar}>{nickname[0].toUpperCase()}</Avatar>
      <span>{nickname}</span>
      <span>,</span>
    </li>
  );
};

export default UserStatistic;