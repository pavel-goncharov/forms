import {FC} from 'react';
import classes from '../../styles/statistic/UserStatistic.module.less';
import {Avatar} from 'antd';
import {AvatarShapes, AvatarSizes} from '../../constants/layout';

interface UserStatisticProps {
  nickname: string;
  isLast: boolean;
}

const UserStatistic: FC<UserStatisticProps> = ({nickname, isLast}) => {
  const textChar = isLast ? '.' : ',';
  return (
    <li className={classes.user}>
      <Avatar shape={AvatarShapes.SQUARE} size={AvatarSizes.SMALL} className={classes.avatar}>{nickname[0]}</Avatar>
      <span>{nickname}</span>
      <span>{textChar}</span>
    </li>
  );
};

export default UserStatistic;