import {Button, message, PageHeader, Popconfirm, Tag} from 'antd';
import {FC, useState} from 'react';
import classes from '../styles/general/Header.module.less';
import {InfoCircleOutlined, SaveOutlined, PlayCircleOutlined, SendOutlined, EditOutlined, UserOutlined, BarChartOutlined} from '@ant-design/icons';
import ModalInfo from './edit/ModalInfo';
import {IModal, ITagsAndExtra} from '../types/form';
import {FormModes, BtnKeys, popConfirmPlacements, TITLE_IS_SEND_PASSAGE, popConfirmArgs, AUTHOR_WARNING} from '../constants/layout';
import {generatePath, useNavigate} from 'react-router-dom';
import {RoutePaths} from '../constants/routes';
import {useCheckIsAuthorFormQuery, useFetchFormTitleQuery} from '../api/endPoints/form';
import {useFetchPassagesQuery} from '../api/endPoints/statistic';
import {useCheckCorrectPassFormQuery} from '../api/endPoints/play';
import { PlayFormCheckMessages } from '../types/play';
import { getIsPassedWarning, getNoQuestionsWarning } from '../utils/messages';
import { useGoToFormPage } from '../hooks/useGoToFormPage';

interface Props {
  mode: FormModes,
  formId: number,
  sendPassage?: () => Promise<boolean>;
  saveQuestions?: () => Promise<void>;
}

const Header: FC<Props> = ({mode, formId, sendPassage, saveQuestions}) => {
  const {data: playRes} = useCheckCorrectPassFormQuery(formId);
  const {data: isAuthor} = useCheckIsAuthorFormQuery(formId);
  const {data: formTitle} = useFetchFormTitleQuery(formId);
  const {data: numberPassages} = useFetchPassagesQuery(formId);

  const goToFormPage = useGoToFormPage(formId);
  const navigate = useNavigate();

  const [modalInfoVisible, setModalInfoVisible] = useState<boolean>(false);

  const modalInfo: IModal = {
    visible: modalInfoVisible,
    setVisible: setModalInfoVisible
  };

  const tagsAndExtra = getTagsAndExtra(mode);

  async function handlerSendPassage(): Promise<void> {
    const isSendPassed = await sendPassage!();
    if(isSendPassed) navigate(RoutePaths.CATALOG);
  }

  function getTagsAndExtra(mode: FormModes): ITagsAndExtra {
    switch(mode) {
      case FormModes.EDIT: 
        return ({
          tags: [
            <Tag onClick={toPlay} key={FormModes.PLAY}><PlayCircleOutlined/></Tag>,
            <Tag onClick={toStatistic} key={FormModes.STATISTIC}><BarChartOutlined/></Tag>
          ],
          extra: [
            <Button onClick={() => setModalInfoVisible(true)} key={BtnKeys.INFO}><InfoCircleOutlined/></Button>,
            <Button onClick={saveQuestions} key={BtnKeys.SAVE}><SaveOutlined/></Button>,
          ]
        });
      case FormModes.PLAY: 
        return ({
          tags: [
            <Tag onClick={toEdit} key={FormModes.EDIT}><EditOutlined/></Tag>,
            <Tag onClick={toStatistic} key={FormModes.STATISTIC}><BarChartOutlined/></Tag>
          ],
          extra: [
            <Popconfirm
              key={BtnKeys.SEND}
              placement={popConfirmPlacements.BOTTOM_RIGHT}
              title={TITLE_IS_SEND_PASSAGE}
              onConfirm={handlerSendPassage}
              okText={popConfirmArgs.okText}
              cancelText={popConfirmArgs.cancelText}
            >
              <Button>
                <SendOutlined/>
              </Button>
            </Popconfirm>
          ]
        });
      case FormModes.STATISTIC: 
        return ({
          tags: [
            <Tag onClick={toPlay} key={FormModes.PLAY}><PlayCircleOutlined/></Tag>,
            <Tag onClick={toEdit} key={FormModes.EDIT}><EditOutlined/></Tag>
          ],
          extra: [
            <Button key={BtnKeys.USERS}><UserOutlined/>{numberPassages}</Button>
          ]
        });
      default:
        return({
          tags: [],
          extra: []
        });
    }
  }

  function toPlay(): void {
    switch(playRes?.message) {
      case PlayFormCheckMessages.NO_QUESTIONS:
        const noQuestionsWarning = getNoQuestionsWarning(formTitle!);
        message.warning(noQuestionsWarning);
        break;
      case PlayFormCheckMessages.IS_PASSED:
        const isPassedWarning = getIsPassedWarning(formTitle!);
        message.warning(isPassedWarning);
        break;
      case PlayFormCheckMessages.CORRECT:
        goToFormPage(RoutePaths.PLAY);
        break;
    }
  }

  function toEdit(): void {
    if(isAuthor) {
      goToFormPage(RoutePaths.EDIT);
    } else {
      message.warning(AUTHOR_WARNING);
    }
  }

  function toStatistic(): void {
    if(isAuthor) {
      goToFormPage(RoutePaths.STATISTIC);
    } else {
      message.warning(AUTHOR_WARNING);
    }
  }

  return (
    <>
      <PageHeader
        onBack={() => navigate(RoutePaths.CATALOG)}
        tags = {tagsAndExtra.tags}
        title={formTitle}
        extra={tagsAndExtra.extra}
        className={classes.pageHeader}
      />
      <ModalInfo modal={modalInfo}/>
    </>
  );
};

export default Header;