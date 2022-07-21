import {FC, useEffect, useState} from 'react';
import Header from '../components/Header';
import QuestionItem from '../components/formPage/QuestionItem';
import classes from '../styles/formPage/FormPage.module.less';
import {FormModes} from '../constants/layout';
import {useAppSelector} from '../hooks/useAppSelector';
import {useActions} from '../hooks/useActions';
import {IArgsPassage} from '../types/play';
import {message} from 'antd';
import {IQuestion} from '../types/form';
import {calcFormatDataForSend, checkValidatePlayForm, getNotSelectedQuestions} from '../utils/play';
import ErrorPlay from '../components/play/ErrorPlay';
import {useCallbackPrompt} from '../hooks/useCallbackPrompt';
import ModalLeavePlay from '../components/play/ModalLeavePlay';
import {useFetchQuestionsQuery} from '../api/endPoints/form';
import {useCreatePassageMutation} from '../api/endPoints/play';
import {useGetFormId} from '../hooks/useGetFormId';


const Play: FC = () => {
  const formId = useGetFormId();

  const {data: formData} = useFetchQuestionsQuery(formId);
  const [createPassage] = useCreatePassageMutation();

  const playQuestions = useAppSelector(state => state.play.questions);
  const isErrorPlay = useAppSelector(state => state.play.isErrorPlay);
  const isModalLeftWillBeShown = useAppSelector(state => state.play.isModalLeftPlayWillBeShown);

  const {setPlayQuestions, setNotSelectedQuestions, setIsErrorPlay, setFalseToIsModalLeftPlayWillBeShown} = useActions();

  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isModalLeftWillBeShown);

  const [questionItems, setQuestionItems] = useState<IQuestion[]>([]);

  useEffect(() => {
    setIsErrorPlay(false);
    setNotSelectedQuestions([]);
  }, []);

  useEffect(() => {
    if (formData) {
      setPlayQuestions(formData);
      setQuestionItems(formData);
    }
  }, [formData]);

  async function sendPassage(): Promise<boolean> {
    const notSelectedQuestions = getNotSelectedQuestions(playQuestions);
    const isValidatePlayForm = checkValidatePlayForm(notSelectedQuestions);

    if(isValidatePlayForm) {
      setNotSelectedQuestions(notSelectedQuestions);
      setIsErrorPlay(false);
      const argsReq: IArgsPassage = {
        id: formId,
        questions: calcFormatDataForSend(playQuestions) 
      };
      const feedback = await createPassage(argsReq).unwrap();
      message.success(feedback);
      setFalseToIsModalLeftPlayWillBeShown();
      return true;
    } else {
      setNotSelectedQuestions(notSelectedQuestions);
      setIsErrorPlay(true);
      return false;
    }
  }

  return (
    <div className={classes.formPage}>
      <Header 
        mode={FormModes.PLAY}
        formId={formId}
        sendPassage={sendPassage}
      />
      {isErrorPlay && <ErrorPlay formId={formId}/>}
      <div>
        {questionItems?.map((question, index) => 
          <QuestionItem
            question={question}
            index={index + 1}
            isEditMode={false}
            key={question.id}
          />
        )}
      </div>
      <ModalLeavePlay
        show={showPrompt!}
        confirmNavigate={confirmNavigation}
        cancelNavigate={cancelNavigation}
        send={sendPassage}
      />
    </div>
  );
};

export default Play;