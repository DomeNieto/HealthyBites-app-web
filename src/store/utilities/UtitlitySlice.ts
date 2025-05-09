import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UtilityState {
  searchText: string;
  searchDate: string;
  searchNumber: string;
}

const initialState: UtilityState = {
  searchText: "",
  searchDate: "",
  searchNumber: "",
};

export const UtilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    changeSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    changeSearchDate(state, action: PayloadAction<string>) {
      state.searchDate = action.payload;
    },
    changeSearchNumber(state, action: PayloadAction<string>) {
      state.searchNumber = action.payload;
    },
    clearFilter(state) {
      state.searchText = initialState.searchText;
    },
    resetUtilityState(state) {
      state.searchText = initialState.searchText;
    },
  },
});

export const selectUtilityFilter = (state: RootState) => state.utility;

export const {
  changeSearchText,
  changeSearchDate,
  changeSearchNumber,
  clearFilter,
  resetUtilityState,
} = UtilitySlice.actions;

export default UtilitySlice.reducer;
