import {IFilterCalcStatistic, IFilterItem} from '../types/statistic';

export function getFilterFormatForServer(filterQuestions: IFilterItem[], filterUsers: IFilterItem[]): IFilterCalcStatistic {
  const selectedQuestions = getArrayId(filterQuestions);
  const selectedUsers = getArrayId(filterUsers);
  const filter = {selectedQuestions, selectedUsers};
  return filter;
} 

function getArrayId(objArr: IFilterItem[] | IFilterItem[]): number[] {
  return objArr.map(obj => obj.id);
}