import {FC} from 'react';
import {EditOutlined, PlayCircleOutlined, BarChartOutlined, DeleteOutlined} from '@ant-design/icons';
import {ICatalogItem} from '../../types/form';
import {BtnTypes, FormModes, popConfirmArgs} from '../../constants/layout';
import classes from '../../styles/catalog/CatalogItem.module.less';
import {Button, message, Popconfirm} from 'antd';
import {generatePath, useNavigate} from 'react-router-dom';
import {PlayFormCheckMessages} from '../../types/play';
import {getIsPassedWarning, getNoQuestionsWarning, getTitlePopConfirmDeleteForm} from '../../utils/messages';
import {RoutePaths} from '../../constants/routes';
import {useCheckCorrectPassFormQuery} from '../../api/endPoints/play';
import {useCheckIsAuthorFormQuery, useDeleteFormMutation} from '../../api/endPoints/form';
import {useGoToFormPage} from '../../hooks/useGoToFormPage';

interface Props {
  form: ICatalogItem,
}

const CatalogItem: FC<Props> = ({form}) => {
  const {data: playRes} = useCheckCorrectPassFormQuery(form.id);
  const {data: isAuthor} = useCheckIsAuthorFormQuery(form.id);
  const [deleteItem] = useDeleteFormMutation();
  
  const goToFormPage = useGoToFormPage(form.id);

  const titlePopConfirmDelete: string = getTitlePopConfirmDeleteForm(form.title);

  function toPlay(): void {
    switch(playRes?.message) {
      case PlayFormCheckMessages.NO_QUESTIONS:
        const noQuestionsWarning = getNoQuestionsWarning(form.title);
        message.warning(noQuestionsWarning);
        break;
      case PlayFormCheckMessages.IS_PASSED:
        const isPassedWarning = getIsPassedWarning(form.title);
        message.warning(isPassedWarning);
        break;
      case PlayFormCheckMessages.CORRECT:
        goToFormPage(RoutePaths.PLAY);
        break;
    }
  }

  function toEdit(): void {
    goToFormPage(RoutePaths.EDIT);
  }

  function toStatistic(): void {
    goToFormPage(RoutePaths.STATISTIC);
  }

  async function removeForm(): Promise<void> {
    const feedback = await deleteItem(form.id).unwrap();
    message.success(feedback);
  }

  return (
    <div className={classes.item}>
      <div className={classes.head}>
        {form.title}
      </div>
      <div className={classes.body}>
        <div className={classes.info}>
          <p>Description: {form.description}</p>
          <p>Questions: {form.questions}</p>
          <p>Author: {form.author}</p>
        </div>
        <div className={classes.actions}>
          <Button
            onClick={toPlay}
            className={classes.action}
            type={BtnTypes.LINK}
          >
            <PlayCircleOutlined key={FormModes.PLAY}/>
          </Button>
          <Button
            disabled={!isAuthor} 
            onClick={toEdit}
            className={classes.action}
            type={BtnTypes.LINK}
          >
            <EditOutlined key={FormModes.EDIT}/>
          </Button>
          <Button
            disabled={!isAuthor} 
            onClick={toStatistic}
            className={classes.action}
            type={BtnTypes.LINK}
          >
            <BarChartOutlined key={FormModes.STATISTIC}/>
          </Button>
          <Button 
            disabled={!isAuthor} 
            className={classes.action}
            type={BtnTypes.LINK}
          >
            <Popconfirm
              title={titlePopConfirmDelete}
              onConfirm={removeForm}
              okText={popConfirmArgs.okText}
              cancelText={popConfirmArgs.cancelText}
            >
              <DeleteOutlined key={FormModes.DELETE}/>
            </Popconfirm>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;