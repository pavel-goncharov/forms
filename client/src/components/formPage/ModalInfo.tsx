import {Button, Input, Modal} from 'antd';
import {FC, useState} from 'react';
import {IModalInfo} from '../../models/form';


interface ModalInfoProps {
  modal: IModalInfo;
}

const ModalInfo: FC<ModalInfoProps> = ({modal}) => {
  const [formName, setFormName] = useState<string>('Form1');
  const [formDescription, setFormDescription] = useState<string>('Description1');

  return (
    <Modal title="Form info" visible={modal.visible} 
      onOk={() => modal.setVisible(false)} 
      onCancel={() => modal.setVisible(false)}
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
      <p>Questions: 20</p>
      <p>Author: user0</p>
      <Button danger>Delete form</Button>
    </Modal>
  );
};

export default ModalInfo;