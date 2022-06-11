import {useAppDispatch} from './useAppDispatch';
import {bindActionCreators} from '@reduxjs/toolkit';
import Slices from '../store/slices';

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(Slices, dispatch);
};