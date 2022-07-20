import {Button, PageHeader, Popconfirm, Tag} from 'antd';
import {FC, useState} from 'react';
import classes from '../styles/general/Header.module.less';
import {InfoCircleOutlined, SaveOutlined, PlayCircleOutlined, SendOutlined, EditOutlined, UserOutlined, BarChartOutlined} from '@ant-design/icons';
import ModalInfo from './edit/ModalInfo';
import {IModal, ITagsAndExtra} from '../types/form';
import {FormModes, BtnKeys, popConfirmPlacements, TITLE_IS_SEND_PASSAGE, popConfirmArgs} from '../constants/layout';
import {generatePath, useNavigate} from 'react-router-dom';
import {RoutePaths} from '../constants/routes';
import {useFetchFormTitleQuery} from '../api/endPoints/form';
import {useFetchPassagesQuery} from '../api/endPoints/statistic';

interface Props {
  mode: FormModes,
  formId: number,
  sendPassage?: () => Promise<boolean>;
  saveQuestions?: () => Promise<void>;
}

const Header: FC<Props> = ({mode, formId, sendPassage, saveQuestions}) => {
  const {data: titleForm} = useFetchFormTitleQuery(formId);
  const {data: numberPassages} = useFetchPassagesQuery(formId);

  const [modalInfoVisible, setModalInfoVisible] = useState<boolean>(false);

  const navigate = useNavigate();

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

  function toFormPage(routePath: RoutePaths): void {
    const formPagePath = generatePath(routePath, {id: formId.toString()});
    navigate(formPagePath);
  }

  function toPlay(): void {
    toFormPage(RoutePaths.PLAY);
  }

  function toEdit(): void {
    toFormPage(RoutePaths.EDIT);
  }

  function toStatistic(): void {
    toFormPage(RoutePaths.STATISTIC);
  }

  return (
    <>
      <PageHeader
        onBack={() => navigate(RoutePaths.CATALOG)}
        tags = {tagsAndExtra.tags}
        title={titleForm}
        extra={tagsAndExtra.extra}
        className={classes.pageHeader}
      />
      <ModalInfo modal={modalInfo}/>
    </>
  );
};

export default Header;