import {Button, Modal} from 'antd';
import {FC} from 'react';
import {BtnTitles, BtnTypes, BtnKeys, ModalTitles } from '../../constants/layout';
import {useActions} from '../../hooks/useActions';

interface Props {
  show: boolean;
  confirmNavigate: () => void;
  cancelNavigate: () => void;
  save: () => Promise<void>;
}

const ModalLeaveEdit: FC<Props> = ({show, confirmNavigate, cancelNavigate, save}) => {

  const {setFalseToIsModalLeftEditWillBeShown: setFalseToIsModalLeftWillBeShown} = useActions();

  async function saveForm(): Promise<void> {
    await save();
    leavePage();
  }

  function leavePage(): void {
    setFalseToIsModalLeftWillBeShown();
    confirmNavigate();
  }
  return (
    <Modal 
      title={ModalTitles.WARNING}
      visible={show}
      onCancel={cancelNavigate}
      footer={[
        <Button onClick={saveForm} type={BtnTypes.PRIMARY} key={BtnKeys.SAVE}>{BtnTitles.SAVE}</Button>,
        <Button onClick={leavePage} key={BtnKeys.LEAVE}>{BtnTitles.LEAVE_PAGE}</Button>
      ]}
    >
      <p>You are leaving this page without saving the last changes.</p>
      <p>Do you want to save the last changes?</p>
    </Modal>
  );
};

export default ModalLeaveEdit;