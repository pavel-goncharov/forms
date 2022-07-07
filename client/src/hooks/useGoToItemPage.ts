import {useNavigate} from "react-router-dom";
import {Paths} from "../routes";
import calcDynamicUrl from "../utils/calcDynamicUrl";

export function useGoToItemPage() {
  const navigate = useNavigate();
  const goTo = (path: Paths, formId: number) => navigate(calcDynamicUrl(path, formId));
  return {goTo};
}