import {Button, PageHeader, Tag} from 'antd';
import {FC, ReactElement, ReactNode, useState} from 'react';
import classes from '../styles/general/Header.module.less';
import {PlusSquareOutlined, InfoCircleOutlined, SaveOutlined, PlayCircleOutlined, DeleteOutlined, SendOutlined, EditOutlined, UserOutlined, BarChartOutlined} from '@ant-design/icons';
import ModalInfo from './formPage/ModalInfo';
import { IModalInfo } from '../models/form';
import { Paths } from '../routes';
import { useLocation } from 'react-router-dom';
import { initTitleForm } from '../utils/initData';


const FormPageHeader: FC = () => {
  const location = useLocation();

  const [modalInfoVisible, setModalInfoVisible] = useState<boolean>(false);

  const modal: IModalInfo = {
    visible: modalInfoVisible,
    setVisible: setModalInfoVisible
  };

  const tags = getTags(location.pathname);
  const extra = getExtra(location.pathname);

  function getTags(path: string): ReactElement[] {
    switch(path) {
      case Paths.EDIT:
        return [
          <Tag key='play'><PlayCircleOutlined/></Tag>,
          <Tag key='statistic'><BarChartOutlined/></Tag>
        ];
      case Paths.PLAY:
        return [
          <Tag key='edit'><EditOutlined/></Tag>,
          <Tag key='statistic'><BarChartOutlined/></Tag>
        ];
      case Paths.STATISTIC:
        return [
          <Tag key='play'><PlayCircleOutlined/></Tag>,
          <Tag key='edit'><EditOutlined/></Tag>
        ];
      default:
        return [];  
    }
  }

  function getExtra(path: string): ReactNode[] {
    switch(path) {
      case Paths.EDIT:
        return [
          <Button key='info' onClick={() => setModalInfoVisible(true)}><InfoCircleOutlined/></Button>,
          <Button key='save'><SaveOutlined/></Button>,
        ];
      case Paths.PLAY:
        return [
          <Button key='send'><SendOutlined/></Button>
        ];
      case Paths.STATISTIC:
        return [
          <Button key='users'><UserOutlined/>10</Button>
        ];
      default:
        return [];
    }
  }

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        tags = {tags}
        title={initTitleForm}
        extra={extra}
        className={classes.pageHeader}
      />
      <ModalInfo modal={modal}/>
    </>
  );
};

export default FormPageHeader;