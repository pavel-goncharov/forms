import {FC, useState} from 'react';
import {Form, Input, Modal} from 'antd';
import {INewCatalogItemParams} from '../../types/catalog';
import classes from '../../styles/catalog/ModalNewItem.module.less';
import {TITLE_IS_REQUIRED, FormItemLabels, ModalTitles, Placeholders, ValidateStatuses, VERTICAL} from '../../constants/layout';

interface Props {
  visible: boolean;
  create: (newItemData: INewCatalogItemParams) => void;
  cancel: () => void;
}

const ModalNewCatalogItem: FC<Props> = ({visible, create, cancel}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  
  function handlerOnOk(): void {
    if(title) {
      const newItemData = {
        title: title,
        description: description || title
      }
      clear();
      create(newItemData);
    } else {
      setIsError(true);
    }
  }

  function clear(): void {
    setIsError(false);
    setTitle('');
    setDescription('');
  }

  function handlerCancel(): void {
    clear();
    cancel();
  }

  const titleValidateStatus: ValidateStatuses = isError ? ValidateStatuses.ERROR : ValidateStatuses.VALIDATING;

  return (
    <Modal
      title={ModalTitles.NEW_FORM}
      visible={visible}
      onOk={handlerOnOk}
      onCancel={handlerCancel}
    >
      <Form layout={VERTICAL}>
        {isError && 
          <p className={classes.errorTitle}>{TITLE_IS_REQUIRED}</p>
        }
        <Form.Item
          label={FormItemLabels.TITLE}
          validateStatus={titleValidateStatus}
          className={classes.formItem}
        >
          <Input 
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={Placeholders.FORM_TITLE}
          />
        </Form.Item>
        <Form.Item
          label={FormItemLabels.DESCRIPTION}
          className={classes.formItem}
        >
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={Placeholders.FORM_DESCRIPTION}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalNewCatalogItem;