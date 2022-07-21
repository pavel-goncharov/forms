import {Button, Form, Input, message, Modal, Popconfirm} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {IModal} from '../../types/form';
import {BtnTitles, FormItemLabels, ModalTitles, Placeholders, popConfirmArgs, popConfirmPlacements, TITLE_IS_REQUIRED, ValidateStatuses, VERTICAL} from '../../constants/layout';
import classes from '../../styles/edit/ModalInfo.module.less';
import {getTitlePopConfirmDeleteForm} from '../../utils/messages';
import {RoutePaths} from '../../constants/routes';
import {useFetchInfoQuery, useUpdateInfoMutation} from '../../api/endPoints/edit';
import {useDeleteFormMutation} from '../../api/endPoints/form';
import {useGetFormId} from '../../hooks/useGetFormId';

interface Props {
  modal: IModal;
}

const ModalInfo: FC<Props> = ({modal}) => {
  const formId = useGetFormId();

  const {data: formData} = useFetchInfoQuery(formId);
  const [deleteItem] = useDeleteFormMutation();
  const [updateInfo] = useUpdateInfoMutation();
  
  const navigate = useNavigate();

  const [isError, setIsError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if(!formData) return;
    setTitle(formData.title);
    setDescription(formData.description);
  }, [formData]);

  async function deleteForm(): Promise<void> {
    const feedback = await deleteItem(formId).unwrap();
    modal.setVisible(false);
    message.success(feedback);
    navigate(RoutePaths.CATALOG);
  }

  async function updateInfoForm(): Promise<void> {
    if(title) {
      setIsError(false);
      if(!description) setDescription(title);
      const infoData = {
        formId: formId,
        newTitle: title,
        newDescription: description || title
      };
      const {success: feedback} = await updateInfo(infoData).unwrap();
      modal.setVisible(false);
      message.success(feedback);
    } else {
      setIsError(true);
    }
  }

  function handlerCancel(): void {
    if(!title && formData?.title) {
      setTitle(formData.title);
    }
    if(!description && formData?.description) {
      setDescription(formData.description);
    }
    setIsError(false);
    modal.setVisible(false);
  }

  const titleValidateStatus: ValidateStatuses = isError ? ValidateStatuses.ERROR : ValidateStatuses.VALIDATING;

  const titlePopConfirmDelete: string = getTitlePopConfirmDeleteForm(formData?.title!);
  
  return (
    <Modal title={ModalTitles.FORM_INFO} visible={modal.visible} 
      onOk={updateInfoForm} 
      onCancel={handlerCancel}
    >
      <Form layout={VERTICAL}>
        {isError && <p className={classes.errorTitle}>{TITLE_IS_REQUIRED}</p>}
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
        <p>Questions: {formData?.questions}</p>
        <p>Author: {formData?.author}</p>
        <Popconfirm
          placement={popConfirmPlacements.TOP_LEFT}
          title={titlePopConfirmDelete}
          onConfirm={deleteForm}
          okText={popConfirmArgs.okText}
          cancelText={popConfirmArgs.cancelText}
        >
          <Button danger>{BtnTitles.DELETE_FORM}</Button>
        </Popconfirm>
      </Form>
    </Modal>
  );
};

export default ModalInfo;