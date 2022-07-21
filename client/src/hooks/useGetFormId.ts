import {useParams} from 'react-router-dom';

export function useGetFormId() {
  const {id} = useParams();
  const formId = Number(id);
  return formId;
}