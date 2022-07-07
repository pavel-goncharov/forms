import {FC, useEffect, useState} from 'react';
import {Avatar, Checkbox} from 'antd';
import classes from '../../styles/statistic/SelectUser.module.less';
import {NumberOutlined} from '@ant-design/icons';
import { IFilterUser } from '../../models/statistic';
import { useActions } from '../../hooks/useActions';

interface SelectUserProps {
  user: IFilterUser;
  isAll: boolean;
  index: number;
}

const SelectUser: FC<SelectUserProps> = ({user, isAll, index}) => {
  const {addSelectedUser, deleteSelectedUser} = useActions();
  const [isSelected, setIsSelected] = useState<boolean>(isAll);

  useEffect(() => {
    handlerIsSelected(isAll);
  }, [isAll]);
  
  function handlerIsSelected(newValue: boolean) {
    setIsSelected(newValue);
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
          <Avatar shape="square" size={18} className={classes.avatar}>{user.nickname[0].toUpperCase()}</Avatar>
          <div className={classes.nickname}>{user.nickname}</div>
        </div>
      </Checkbox>
    </li>
  );
};

export default SelectUser;