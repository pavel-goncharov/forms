import {Button, message, PageHeader, Popconfirm, Tag} from 'antd';
import {FC, useState} from 'react';
import classes from '../styles/general/Header.module.less';
import {InfoCircleOutlined, SaveOutlined, PlayCircleOutlined, SendOutlined, EditOutlined, UserOutlined, BarChartOutlined} from '@ant-design/icons';
import ModalInfo from './formPage/ModalInfo';
import { IModalInfo, ITagsAndExtra } from '../models/form';
import { HeaderModes, KeyOfButtons } from '../utils/constants';
import { useGoToItemPage } from '../hooks/useGoToItemPage';
import { Paths } from '../routes';
import { useNavigate } from 'react-router-dom';
import formApi from '../api/extended/formApi';
import { useAppSelector } from '../hooks/useAppSelector';
import editApi from '../api/extended/editApi';
import statisticApi from '../api/extended/statisticApi';
import { IQuestionEditor } from '../models/edit';

interface HeaderProps {
  mode: HeaderModes,
  formId: number,
  sendPassage?: () => void;
}

const Header: FC<HeaderProps> = ({mode, formId, sendPassage}) => {
  const {data: titleForm} = formApi.useFetchTitleQuery(formId);
  const [saveTheChanges] = editApi.useSaveTheChangesMutation();
  const {data: numberPassages} = statisticApi.useFetchPassagesQuery(formId);

  const questionsEdit = useAppSelector(state => state.edit.questions); 

  const navigate = useNavigate();
  const navigateItem = useGoToItemPage();

  const [modalInfoVisible, setModalInfoVisible] = useState<boolean>(false);

  const modal: IModalInfo = {
    visible: modalInfoVisible,
    setVisible: setModalInfoVisible
  };

  const tagsAndExtra = getTagsAndExtra(mode);

  function getTagsAndExtra(mode: HeaderModes): ITagsAndExtra {
    switch(mode) {
      case HeaderModes.EDIT: 
        return ({
          tags: [
            <Tag onClick={toPlay} key={HeaderModes.PLAY}><PlayCircleOutlined/></Tag>,
            <Tag onClick={toStatistic} key={HeaderModes.STATISTIC}><BarChartOutlined/></Tag>
          ],
          extra: [
            <Button onClick={() => setModalInfoVisible(true)} key={KeyOfButtons.INFO}><InfoCircleOutlined/></Button>,
            <Button onClick={saveEditQuestions} key={KeyOfButtons.SAVE}><SaveOutlined/></Button>,
          ]
        });
      case HeaderModes.PLAY: 
        return ({
          tags: [
            <Tag onClick={toEdit} key={HeaderModes.EDIT}><EditOutlined/></Tag>,
            <Tag onClick={toStatistic} key={HeaderModes.STATISTIC}><BarChartOutlined/></Tag>
          ],
          extra: [
            <Popconfirm
              key={KeyOfButtons.SEND}
              placement="bottomRight"
              title="Are you sure to send your passage?"
              onConfirm={sendPassage!}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <SendOutlined/>
              </Button>
            </Popconfirm>
          ]
        });
      case HeaderModes.STATISTIC: 
        return ({
          tags: [
            <Tag onClick={toPlay} key={HeaderModes.PLAY}><PlayCircleOutlined/></Tag>,
            <Tag onClick={toEdit} key={HeaderModes.EDIT}><EditOutlined/></Tag>
          ],
          extra: [
            <Button key={KeyOfButtons.USERS}><UserOutlined/>{numberPassages}</Button>
          ]
        });
    }
  }

  async function saveEditQuestions() {
    const editQuestions = questionsEdit.map(question => ({
      id: question.id,
      title: question.title,
      answers: question.answers.map(answer => ({
        id: answer.id,
        title: answer.title
      }))
    }));
    const isValidateQuestions = checkingValiditySavedForm(editQuestions);
    // -----------------------------------------------------------------------
    const argEndpoint = {
      formId,
      editQuestions
    };
    const res = await saveTheChanges(argEndpoint);
    if (!("data" in res)) return;
    const messageText = res.data;
    message.success(messageText);
  }

  function checkingValiditySavedForm(editQuestions: IQuestionEditor[]): boolean {
    if(!editQuestions.length) return false;
    for(const question of editQuestions) {
      if(!question.title) return false;
      if(question.answers.length < 2) return false;
      for(const answer of question.answers) {
        if(!answer.title) return false;
      }
    }
    return true;
  }
  // Error
  // Form1 can\'t be saved because it contains invalid data. 
  // Form Rules:
  // Г 1) The form must contain at least 1 question.
  //      Mistake: Form1 has no questions.
  // Г 2) The form question must have at least 2 answers.
  //      Mistakes: question N,.
  // Г 3) The title of questions and answers must be completed.
  //      Mistakes: question N, answer N of question N.


  function toPlay() {
    navigateItem.goTo(Paths.PLAY, formId);
  }

  function toEdit() {
    navigateItem.goTo(Paths.EDIT, formId);
  }

  function toStatistic() {
    navigateItem.goTo(Paths.STATISTIC, formId);
  }

  return (
    <>
      <PageHeader
        onBack={() => navigate(Paths.CATALOG)}
        tags = {tagsAndExtra.tags}
        title={titleForm}
        extra={tagsAndExtra.extra}
        className={classes.pageHeader}
      />
      <ModalInfo modal={modal}/>
    </>
  );
};

export default Header;