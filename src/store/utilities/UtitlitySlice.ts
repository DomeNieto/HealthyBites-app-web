import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UtilityState {
  search: string;
}

const initialState: UtilityState = {
  search: "",
};

export const UtilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    changeFilterBySearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    clearFilter(state) {
      state.search = initialState.search;
    },
    resetUtilityState(state) {
      state.search = initialState.search;
    },
  },
});

export const selectUtilityFilter = (state: RootState) => state.utility;

export const { changeFilterBySearch, clearFilter, resetUtilityState } =
  UtilitySlice.actions;

export default UtilitySlice.reducer;
