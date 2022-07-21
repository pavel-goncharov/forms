import {Button, Modal} from 'antd';
import {FC} from 'react';
import {BtnTypes, BtnKeys, ModalTitles, BtnTitles} from '../../constants/layout';
import {useActions} from '../../hooks/useActions';

interface Props {
  show: boolean;
  confirmNavigate: () => void;
  cancelNavigate: () => void;
  send: () => Promise<boolean>;
}

const ModalLeavePlay: FC<Props> = ({show, confirmNavigate, cancelNavigate, send}) => {
  const {setFalseToIsModalLeftPlayWillBeShown} = useActions();

  async function sendResult(): Promise<void> {
    const isSendPassage = await send();
    if(isSendPassage) leavePage();
  }

  function leavePage(): void {
    setFalseToIsModalLeftPlayWillBeShown();
    confirmNavigate();
  }

  return (
    <Modal 
      title={ModalTitles.WARNING}
      visible={show}
      onCancel={cancelNavigate}
      footer={[
        <Button onClick={sendResult} type={BtnTypes.PRIMARY} key={BtnKeys.SEND}>{BtnTitles.SEND}</Button>,
        <Button onClick={leavePage} key={BtnKeys.LEAVE}>{BtnTitles.LEAVE_PAGE}</Button>
      ]}
    >
      <p>You are leaving this page without saving the result.</p>
      <p>Do you want to send your result?</p>
    </Modal>
  );
};

export default ModalLeavePlay;