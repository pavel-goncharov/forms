import {FC} from 'react';
import CatalogItem from '../components/catalog/CatalogItem';
import {IFormItem} from '../models/form';
import {initForms} from '../utils/initData';
import classes from '../styles/catalog/Catalog.module.less';
import { Button, Input} from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

const Catalog: FC = () => {
  const forms: IFormItem[] = initForms;

  function searchForms() {

  }

  return (
    <div className={classes.catalog}>
      <div className={classes.buttons}>
        <Button size="large">New</Button>
        <Input.Search placeholder="Search forms" size="large" onSearch={searchForms} enterButton className={classes.search}/>
      </div>
      <div className={classes.items}>
        {forms.map(form => 
          <CatalogItem
            form={form}
            key={form.id}
          />
        )}
      </div>
    </div>
  );
};

export default Catalog;