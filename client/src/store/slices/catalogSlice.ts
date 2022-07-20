import {ICatalogItem} from '../../types/form';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SliceNames} from '../../constants/slices';

interface CatalogState {
  items: ICatalogItem[],
  searchedItems: ICatalogItem[],
} 

const initialState: CatalogState = {
  items: [],
  searchedItems: []
}

const catalogSlice = createSlice({
  name: SliceNames.CATALOG,
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ICatalogItem[]>) {
      state.items = action.payload;
    },
    setSearchedItems(state, action: PayloadAction<ICatalogItem[]>) {
      state.searchedItems = action.payload;
    }
  }
});

export default catalogSlice;