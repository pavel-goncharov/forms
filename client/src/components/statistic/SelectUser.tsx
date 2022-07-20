import {FC, useEffect, useState} from 'react';
import {Avatar, Checkbox} from 'antd';
import classes from '../../styles/statistic/SelectUser.module.less';
import {NumberOutlined} from '@ant-design/icons';
import {IFilterItem} from '../../types/statistic';
import {useActions} from '../../hooks/useActions';
import {AvatarShapes, AvatarSizes} from '../../constants/layout';

interface Props {
  user: IFilterItem;
  isAll: boolean;
  index: number;
}

const SelectUser: FC<Props> = ({user, isAll, index}) => {
  const {addSelectedUser, deleteSelectedUser} = useActions();

  const [isSelected, setIsSelected] = useState<boolean>(isAll);

  useEffect(() => {
    handlerIsSelected(isAll);
  }, [isAll]);
  
  function handlerIsSelected(newValue: boolean): void {
    setIsSelected(newValue);
    if(newValue) addSelectedUser(user);
    else deleteSelectedUser(user.id);
  }
  
  return (
    <li className={classes.user}>
      <Checkbox
        checked={isSelected}
        onChange={() => handlerIsSelected(!isSelected)} 
        className={classes.checkbox}
      >
        <div className={classes.content}>
          <div className={classes.number}>
            <NumberOutlined/>
            <span>{index + 1}</span>
          </div>
          <Avatar shape={AvatarShapes.SQUARE} size={AvatarSizes.SMALL} className={classes.avatar}>{user.title[0]}</Avatar>
          <div className={classes.nickname}>{user.title}</div>
        </div>
      </Checkbox>
    </li>
  );
};

export default SelectUser;