import {generatePath, useNavigate} from 'react-router-dom';
import {RoutePaths} from '../constants/routes';

export function useGoToFormPage(formId: number) {
  const navigate = useNavigate();

  function goToFormPage(routePath: RoutePaths) {
    const formPagePath = generatePath(routePath, {id: formId.toString()});
    navigate(formPagePath);
  }
  
  return goToFormPage;
}