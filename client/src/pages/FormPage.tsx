import {FC, useEffect, useState} from 'react';
import Header from '../components/Header';
import QuestionItem from '../components/formPage/QuestionItem';
import classes from '../styles/formPage/FormPage.module.less';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { Paths } from '../routes';
import { HeaderModes } from '../utils/constants';
import formApi from '../api/extended/formApi';
import playApi from '../api/extended/playApi';
import { useAppSelector } from '../hooks/useAppSelector';
import {useActions} from '../hooks/useActions';
import { IPassage } from '../models/play';
import { Button, message } from 'antd';
import { IQuestionFormPage } from '../models/form';

const FormPage: FC = () => {
  const params = useParams();
  const formId = Number(params.id);

  const location = useLocation();
  const navigate = useNavigate();
  
  const {addQuestion, setPlayQuestions, setEditQuestions} = useActions();

  const {data: formData} = formApi.useFetchQuestionItemsQuery(formId);
  const [createPassage] = playApi.useCreatePassageMutation();

  const userId = useAppSelector(state => state.user.user?.id);
  const playQuestions = useAppSelector(state => state.play.questions);

  const [questionItems, setQuestionItems] = useState<IQuestionFormPage[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(checkUrl(location.pathname, Paths.EDIT));

  const modeFormPage = isEditMode ? HeaderModes.EDIT : HeaderModes.PLAY;

  useEffect(() => {
    if (formData) {
      if(isEditMode) setEditQuestions(formData);
      else setPlayQuestions(formData);
      setQuestionItems(formData);
      setIsEditMode(checkUrl(location.pathname, Paths.EDIT))
    }
  }, [location.pathname, formData]);
     
  function checkUrl(currentPath: string, somePath: string): boolean {
    return currentPath.includes(somePath.slice(0, -3));
  }
  
  async function sendPassage() {
    const data: IPassage = {
      id: formId,
      userId,
      questions: calcFormatDataForSend() 
    }
    const res = await createPassage(data);
    if (!("data" in res)) return;
    const feedback = res.data;
    message.success(feedback);
    navigate(Paths.CATALOG);
  }

  function calcFormatDataForSend() {
    const data = playQuestions.map(question => ({
      id: question.id, 
      answersId: question.answers.filter(answer => answer.isChecked).map(answer => answer.id)
    }));
    return data;
  }

  function newQuestion() {
    const temporaryId = Number(new Date());
    const question = {id: temporaryId, title: '', answers: []};
    addQuestion(question);
    setQuestionItems([...questionItems, question]); 
  }

  function removeQuestion(id: number) {
    setQuestionItems(questionItems.filter(question => question.id !== id));
    const textMessage = `Question deleted`;
    message.success(textMessage);
  }

  
  return (
    <div className={classes.formPage}>
      <Header 
        mode={modeFormPage}
        formId={formId}
        sendPassage={sendPassage}
      />
      <div>
        {questionItems?.map((question, index) => 
          <QuestionItem
            question={question}
            remove={removeQuestion}
            index={index + 1}
            isEditMode={isEditMode}
            key={question.id}
          />
        )}
        {isEditMode && <Button onClick={newQuestion} className={classes.btnNewQuestion}>New Question</Button>}
      </div>
    </div>
  );
};

export default FormPage;