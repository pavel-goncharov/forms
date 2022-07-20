import {IUser} from '../../types/user';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SliceNames} from '../../constants/slices';

interface UserState {
  isAuth: boolean;
  user: IUser | null;
}

const initialState: UserState = {
  isAuth: false,
  user: null,
};

const userSlice = createSlice({
  name: SliceNames.USER,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload; 
    }
  }, 
});

export default userSlice;