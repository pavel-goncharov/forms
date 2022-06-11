import {FC} from 'react';
import {EditOutlined, PlayCircleOutlined, BarChartOutlined, DeleteOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {IFormItem} from '../../models/form';
import {Paths} from '../../routes';
import classes from '../../styles/catalog/CatalogItem.module.less';

interface CatalogItemProps {
  form: IFormItem
}

const CatalogItem: FC<CatalogItemProps> = ({form}) => {
  const navigate = useNavigate();

  function toPlay() {
    // finish id
    navigate(Paths.PLAY);
  }

  function toEdit() {
    // finish id
    navigate(Paths.EDIT);
  }

  function toStatistic() {
    // finish id
    navigate(Paths.STATISTIC);
  }

  function removeForm() {
    
  }
  
  return (
    <div className={classes.item}>
      <div className={classes.head}>{form.title}</div>
      <div className={classes.body}>
        <div className={classes.info}>
          <p>Description: {form.description}</p>
          <p>Questions: {form.questionCount}</p>
          <p>Author: {form.authorNickname}</p>
        </div>
        <ul className={classes.actions}>
          <li className={classes.action}>
            <PlayCircleOutlined onClick={toPlay} key="play"/>
          </li>
          <li className={classes.action}>
            <EditOutlined onClick={toEdit} key="edit"/>
          </li>
          <li className={classes.action}>
            <BarChartOutlined onClick={toStatistic} key="statistic"/>
          </li>
          <li className={classes.action}>
            <DeleteOutlined onClick={removeForm} key="delete"/>
          </li>          
        </ul>
      </div>
    </div>
  );
};

export default CatalogItem;