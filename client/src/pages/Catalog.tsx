import {FC, useEffect, useState} from 'react';
import CatalogItem from '../components/catalog/CatalogItem';
import classes from '../styles/catalog/Catalog.module.less';
import {Button, Input, Spin} from 'antd';
import catalogApi from '../api/extended/catalogApi';
import { ICatalogItem } from '../models/form';
import formApi from '../api/extended/formApi';
import ModalNewItem from '../components/catalog/ModalNewItem';
import {ICatalogItemParams} from '../models/catalog';
import { Empty } from 'antd';

const Catalog: FC = () => {
  const [skip, setSkip] = useState<boolean>(false);

  const {data: items, isLoading} = catalogApi.useFetchItemsQuery(null, {skip});
  const [deleteItem] = formApi.useDeleteItemMutation();
  const [createItem] = catalogApi.useCreateItemMutation(); 

  const [catalogItems, setCataloItems] = useState<ICatalogItem[] | undefined>();
  const [formTitle, setFormTitle] = useState<string>('');
  const [modalNewItemVisible, setModalNewItemVisible] = useState(false);

  useEffect(() => {
    if(skip) setCataloItems([]);
    else setCataloItems(items);
  }, [items, skip]);
  
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
        <button onClick={() => setSkip(!skip)}>handlerSkip</button>
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
        {!catalogItems?.length && !isLoading && 
          <Empty/>
        }
        {!catalogItems?.length && isLoading &&
          <Spin size="large" />
        }
        {}
      </div>
    </div>
  );
};

export default Catalog;