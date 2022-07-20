import {FC, useEffect, useState} from 'react';
import Header from '../components/Header';
import QuestionItem from '../components/formPage/QuestionItem';
import classes from '../styles/formPage/FormPage.module.less';
import {useParams} from 'react-router-dom';
import {BtnTitles, FormModes} from '../constants/layout';
import {useAppSelector} from '../hooks/useAppSelector';
import {useActions} from '../hooks/useActions';
import {Button, message} from 'antd';
import {IQuestion} from '../types/form';
import ErrorEdit from '../components/edit/ErrorEdit';
import ModalLeaveEdit from '../components/edit/ModalLeaveEdit';
import {useCallbackPrompt} from '../hooks/useCallbackPrompt';
import {checkValidateEditForm, getInfoErrorsEdit} from '../utils/edit';
import {useFetchQuestionsQuery} from '../api/endPoints/form';
import {useSaveChangesMutation} from '../api/endPoints/edit';

const Edit: FC = () => {
  const {id} = useParams();
  const formId = Number(id);

  const {data: formData} = useFetchQuestionsQuery(formId);
  const [saveTheChanges] = useSaveChangesMutation();

  const isModalLeftWillBeShown = useAppSelector(state => state.edit.isModalLeftWillBeShown);
  const isErrorEdit = useAppSelector(state => state.edit.isErrorEdit);
  const questionsEdit = useAppSelector(state => state.edit.questions);
  const {addQuestion, setEditQuestions, setInfoErrorsEdit, setIsErrorEdit, setFalseToIsModalLeftWillBeShown} = useActions();
  
  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isModalLeftWillBeShown);
  
  const [questionItems, setQuestionItems] = useState<IQuestion[]>([]);

  useEffect(() => {
    setIsErrorEdit(false);
    setInfoErrorsEdit(null); 
  }, []);
  
  useEffect(() => {
    if (formData) {
      setEditQuestions(formData);
      setQuestionItems(formData);
    }
  }, [formData]);

  function newQuestion(): void {
    const temporaryId = Number(new Date());
    const question = {id: temporaryId, title: '', answers: []};
    addQuestion(question);
    setQuestionItems([...questionItems, question]); 
  }

  function removeQuestion(id: number): void {
    setQuestionItems(questionItems.filter(question => question.id !== id));
    message.success('Question deleted');
  }

  async function saveEditQuestions(): Promise<void> {
    const editQuestions = questionsEdit.map(question => ({
      id: question.id,
      title: question.title,
      answers: question.answers.map(answer => ({
        id: answer.id,
        title: answer.title
      }))
    }));

    const infoErrorsEdit = getInfoErrorsEdit(editQuestions);
    const isValidateEditForm = checkValidateEditForm(infoErrorsEdit);

    if(isValidateEditForm) {
      setInfoErrorsEdit(infoErrorsEdit);
      setIsErrorEdit(false);
      const argsReq = {
        formId,
        editQuestions
      };
      const {success: messageText} = await saveTheChanges(argsReq).unwrap();
      message.success(messageText);
      setFalseToIsModalLeftWillBeShown();
    } else {
      setInfoErrorsEdit(infoErrorsEdit);
      setIsErrorEdit(true);
    }
  }

  return (
    <div className={classes.formPage}>
      <Header 
        mode={FormModes.EDIT}
        saveQuestions={saveEditQuestions}
        formId={formId}
      />
      {isErrorEdit && <ErrorEdit formId={formId}/>}
      <div>
        {questionItems?.map((question, index) => 
          <QuestionItem
            question={question}
            remove={removeQuestion}
            index={index + 1}
            isEditMode={true}
            key={question.id}
          />
        )}
        <Button onClick={newQuestion} className={classes.btnNewQuestion}>{BtnTitles.NEW_QUESTION}</Button>
      </div>
      <ModalLeaveEdit
        show={showPrompt!}
        confirmNavigate={confirmNavigation}
        cancelNavigate={cancelNavigation}
        save={saveEditQuestions}
      />
    </div>
  );
};

export default Edit;