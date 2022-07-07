import {Button, Input, message, Modal, Popconfirm} from 'antd';
import {FC, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import editApi from '../../api/extended/editApi';
import formApi from '../../api/extended/formApi';
import {IModalInfo} from '../../models/form';
import { Paths } from '../../routes';


interface ModalInfoProps {
  modal: IModalInfo;
}

const ModalInfo: FC<ModalInfoProps> = ({modal}) => {
  const params = useParams();
  const formId = Number(params.id);
  
  const navigate = useNavigate();

  const {data: formData} = editApi.useGetInfoQuery(formId);
  const [deleteItem] = formApi.useDeleteItemMutation();
  const [updateInfo] = editApi.useUpdateInfoMutation();
  
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if(!formData) return;
    setTitle(formData.title);
    setDescription(formData.description);
  }, [formData]);

  async function deleteForm() {
    const res = await deleteItem(formId);
    if (!("data" in res)) return;
    const feedback = res.data;
    modal.setVisible(false);
    message.success(feedback);
    navigate(Paths.CATALOG);
  }

  async function updateInfoForm() {
    const infoData = {
      formId,
      newTitle: title,
      newDescription: description
    };
    const res = await updateInfo(infoData);
    if (!("data" in res)) return;
    const feedback = res.data;
    modal.setVisible(false);
    message.success(feedback);
  }

  return (
    <Modal title="Form info" visible={modal.visible} 
      onOk={updateInfoForm} 
      onCancel={() => modal.setVisible(false)}
    >
      <p>
        <span>Title</span> 
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)} 
          placeholder='Form title'
        />
      </p>
      <p>
        <span>Description</span>
        <Input
          value={description}
          onChange={e => setDescription(e.target.value)} 
          placeholder='Form description'
        />
      </p>
      <p>Questions: {formData?.questions}</p>
      <p>Author: {formData?.author}</p>
      <Popconfirm
        placement="topLeft"
        title={`Are you sure to delete the ${formData?.title}?`}
        onConfirm={deleteForm}
        okText="Yes"
        cancelText="No"
        >
          <Button danger>Delete form</Button>
        </Popconfirm>
    </Modal>
  );
};

export default ModalInfo;