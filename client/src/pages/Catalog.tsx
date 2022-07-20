import {FC, useEffect, useState} from 'react';
import CatalogItem from '../components/catalog/CatalogItem';
import classes from '../styles/catalog/Catalog.module.less';
import {Button, Input, Spin} from 'antd';
import {ICatalogItem} from '../types/form';
import ModalNewCatalogItem from '../components/catalog/ModalNewCatalogItem';
import {INewCatalogItemParams} from '../types/catalog';
import {Empty} from 'antd';
import {ClearOutlined} from '@ant-design/icons';
import {BtnTitles, LARGE, Placeholders} from '../constants/layout';
import {useCreateCatalogItemMutation, useFetchCatalogItemsQuery} from '../api/endPoints/catalog';

const Catalog: FC = () => {
  const {data: items, isLoading} = useFetchCatalogItemsQuery();
  const [createItem] = useCreateCatalogItemMutation(); 

  const [catalogItems, setCataloItems] = useState<ICatalogItem[]>([]);
  const [formTitle, setFormTitle] = useState<string>('');
  const [modalNewItemVisible, setModalNewItemVisible] = useState(false);

  useEffect(() => {
    if(items) setCataloItems(items);
  }, [items]);
  
  function searchItems(title: string): void {
    const searchedItems = items?.filter(item => item.title.includes(title));
    setCataloItems(searchedItems || []);
  }

  function handlerClear(): void {
    const emptyStr = '';
    setFormTitle(emptyStr)
    searchItems(emptyStr);
  }

  function handlerBtnNew(): void {
    setModalNewItemVisible(true);
  };

  function cancelModalNewItem(): void {
    setModalNewItemVisible(false);
  };

  async function createNewItem(newItemData: INewCatalogItemParams): Promise<void> {
    await createItem(newItemData);
    setModalNewItemVisible(false);
  };
  
  return (
    <div className={classes.catalog}>
      <div className={classes.buttons}>
        <Button onClick={handlerBtnNew} size={LARGE}>{BtnTitles.NEW}</Button>
        <ModalNewCatalogItem
          visible={modalNewItemVisible}
          create={createNewItem}
          cancel={cancelModalNewItem}
        />
        <Input.Search placeholder={Placeholders.SEARCH_FORMS} size={LARGE}
          value={formTitle} onChange={e => setFormTitle(e.target.value)}
          onSearch={() => searchItems(formTitle)} enterButton className={classes.search}
          suffix={<ClearOutlined onClick={handlerClear} className={classes.clear}/>}
        />
      </div>
      <div className={classes.items}>
        {catalogItems?.map(form => 
          <CatalogItem form={form} key={form.id}/>
        )}
        {!catalogItems?.length && !isLoading && 
          <Empty/>
        }
        {!catalogItems?.length && isLoading &&
          <Spin size={LARGE}/>
        }
        {}
      </div>
    </div>
  );
};

export default Catalog;