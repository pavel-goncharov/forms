import {FC} from 'react';
import {EditOutlined, PlayCircleOutlined, BarChartOutlined, DeleteOutlined} from '@ant-design/icons';
import {ICatalogItem} from '../../models/form';
import {Paths} from '../../routes';
import classes from '../../styles/catalog/CatalogItem.module.less';
import { message, Popconfirm } from 'antd';
import { useGoToItemPage } from '../../hooks/useGoToItemPage';

interface CatalogItemProps {
  form: ICatalogItem,
  remove: (id: number) => any
}

const CatalogItem: FC<CatalogItemProps> = ({form, remove}) => {
  const navigate = useGoToItemPage();

  function toPlay() {
    navigate.goTo(Paths.PLAY, form.id);
  }

  function toEdit() {
    navigate.goTo(Paths.EDIT, form.id);
  }

  function toStatistic() {
    navigate.goTo(Paths.STATISTIC, form.id);
  }

  async function removeForm() {
    const res = await remove(form.id);
    if (!("data" in res)) return;
    const feedback = res.data;
    message.success(feedback);
  }
  
  return (
    <div className={classes.item}>
      <div className={classes.head}>{form.title}</div>
      <div className={classes.body}>
        <div className={classes.info}>
          <p>Description: {form.description || form.title}</p>
          <p>Questions: {form.questions}</p>
          <p>Author: {form.author}</p>
        </div>
        <ul className={classes.actions}>
          <li onClick={toPlay} className={classes.action}>
            <PlayCircleOutlined key="play"/>
          </li>
          <li onClick={toEdit} className={classes.action}>
            <EditOutlined key="edit"/>
          </li>
          <li onClick={toStatistic} className={classes.action}>
            <BarChartOutlined key="statistic"/>
          </li>
          <li className={classes.action}>
            <Popconfirm
              title={`Are you sure to delete the ${form.title}?`}
              onConfirm={removeForm}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined key="delete"/>
            </Popconfirm>
          </li>          
        </ul>
      </div>
    </div>
  );
};

export default CatalogItem;