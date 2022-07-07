import { Input, Modal } from 'antd';
import {FC, useState} from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ICatalogItemParams } from '../../models/catalog';

interface ModalNewItemProps {
  visible: boolean;
  create: (newItemData: ICatalogItemParams) => void;
  cancel: () => void;
}

const ModalNewItem: FC<ModalNewItemProps> = ({visible, create, cancel}) => {
  const [formName, setFormName] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const userId = useAppSelector(state => state.user.user?.id);
  
  function handlerOnOk() {
    const newItemData = {
      title: formName,
      description: formDescription,
      userId
    }
    create(newItemData);
  }

  return (
    <Modal
      title="New Form"
      visible={visible}
      onOk={handlerOnOk}
      onCancel={cancel}
    >
      <p>
        <span>Title</span> 
        <Input
          value={formName}
          onChange={e => setFormName(e.target.value)} 
          placeholder='Form title'
        />
      </p>
      <p>
        <span>Description</span>
        <Input
          value={formDescription}
          onChange={e => setFormDescription(e.target.value)} 
          placeholder='Form description'
        />
      </p>
    </Modal>
  );
};

export default ModalNewItem;