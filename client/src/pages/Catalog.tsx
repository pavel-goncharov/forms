import {FC, useEffect, useState} from 'react';
import CatalogItem from '../components/catalog/CatalogItem';
import classes from '../styles/catalog/Catalog.module.less';
import {Button, Input} from 'antd';
import catalogApi from '../api/extended/catalogApi';
import { ICatalogItem } from '../models/form';
import formApi from '../api/extended/formApi';
import ModalNewItem from '../components/catalog/ModalNewItem';
import {ICatalogItemParams} from '../models/catalog';

const Catalog: FC = () => {
  const {data: items} = catalogApi.useFetchItemsQuery();
  const [deleteItem] = formApi.useDeleteItemMutation();
  const [createItem] = catalogApi.useCreateItemMutation(); 


  const [catalogItems, setCataloItems] = useState<ICatalogItem[] | undefined>();
  const [formTitle, setFormTitle] = useState<string>('');
  const [modalNewItemVisible, setModalNewItemVisible] = useState(false);

  useEffect(() => {
    setCataloItems(items);
  }, [items]);
  
  function searchItems() {
    const searchedItems = items?.filter(item => item.title.includes(formTitle));
    setCataloItems(searchedItems);
  }

  function removeCatalogItem(id: number): any {
    const result = deleteItem(id);
    return result;
  }

  function showModalNewItem() {
    setModalNewItemVisible(true);
  };

  function handleCancelModalNewItem(): void {
    setModalNewItemVisible(false);
  };

  const createNewItem = (newItemData: ICatalogItemParams): void => {
    createItem(newItemData);
    setModalNewItemVisible(false);
  };
  

  return (
    <div className={classes.catalog}>
      <div className={classes.buttons}>
        <Button onClick={showModalNewItem} size="large">New</Button>
        <ModalNewItem
          visible={modalNewItemVisible}
          create={createNewItem}
          cancel={handleCancelModalNewItem}
        />
        <Input.Search placeholder="Search forms" size="large"
          value={formTitle} onChange={e => setFormTitle(e.target.value)}
          onSearch={searchItems} enterButton className={classes.search}
        />
      </div>
      <div className={classes.items}>
        {catalogItems?.map(form => 
          <CatalogItem form={form} remove={removeCatalogItem}key={form.id}/>
        )}
      </div>
    </div>
  );
};

export default Catalog;