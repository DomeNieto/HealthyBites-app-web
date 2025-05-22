import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// State interface for search filters
interface UtilityState {
  searchText: string;
  searchDate: string;
  searchNumber: string;
}

// Initial state of the slice
const initialState: UtilityState = {
  searchText: "",
  searchDate: "",
  searchNumber: "",
};

// Slice with name, initial state and reducers
export const UtilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    // Change the search text
    changeSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    // Change the filter date
    changeSearchDate(state, action: PayloadAction<string>) {
      state.searchDate = action.payload;
    },
    // Change the filter number
    changeSearchNumber(state, action: PayloadAction<string>) {
      state.searchNumber = action.payload;
    },
    resetUtilityState(state) {
      state.searchText = initialState.searchText;
      state.searchDate = initialState.searchDate;
      state.searchNumber = initialState.searchNumber;
    },
  },
});

// Selector to get the full status of the `utility` slice
export const selectUtilityFilter = (state: RootState) => state.utility;

export const {
  changeSearchText,
  changeSearchDate,
  changeSearchNumber,
  resetUtilityState,
} = UtilitySlice.actions;

export default UtilitySlice.reducer;
