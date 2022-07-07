import {ICatalogItem} from "../../models/form";
import {createSlice} from "@reduxjs/toolkit";
import {SliceNames} from "../../utils/constants";

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
    setItems(state, action) {
      state.items = action.payload;
    },
    setSearchedItems(state, action) {
      state.searchedItems = action.payload;
    }
  }
});

export default catalogSlice;