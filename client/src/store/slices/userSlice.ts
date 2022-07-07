import {IUser} from "../../models/user";
import {createSlice} from "@reduxjs/toolkit";
import {SliceNames} from "../../utils/constants";

interface UserState {
  isAuth: boolean;
  user: IUser | null;
}

const initialState: UserState = {
  isAuth: false,
  user: null
};

const userSlice = createSlice({
  name: SliceNames.USER,
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload; 
    },
    setUser(state, action) {
      state.user = action.payload;
    }
  }, 
});

export default userSlice;