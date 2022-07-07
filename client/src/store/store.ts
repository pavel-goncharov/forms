import {combineReducers, configureStore} from '@reduxjs/toolkit';
import appApi from '../api/appApi';
import userSlice from './slices/userSlice';
import catalogSlice from './slices/catalogSlice';
import playSlice from './slices/playSlice';
import editSlice from './slices/editSlice';
import statisticSlice from './slices/statisticSlice';

const sliceReducers = {
  user: userSlice.reducer,
  catalog: catalogSlice.reducer,
  play: playSlice.reducer,
  edit: editSlice.reducer,
  statistic: statisticSlice.reducer 
}

const rootReducer = combineReducers({
  ...sliceReducers,
  [appApi.reducerPath]: appApi.reducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware)
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;