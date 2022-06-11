import {createSlice} from "@reduxjs/toolkit";

interface UserState {
  isAuth: boolean;
}

const initialState: UserState = {
  isAuth: true
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload; 
    }
  } 
});

export default userSlice.reducer;