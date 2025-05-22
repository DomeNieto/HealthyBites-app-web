import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advice } from "../../interfaces/Advices";
import { RootState } from "../store";
import { selectUtilityFilter } from "../utilities/UtitlitySlice";

// Advice slice

// Advice state structure
export interface AdviceState {
  advices: Advice[];
  currentAdvice: Advice;
}

const initialCurrentAdviceState: Advice = {
  id: 0,
  title: "",
  description: "",
  creationDate: "",
};

// Initial state of the active advice
const initialState: AdviceState = {
  advices: [],
  currentAdvice: initialCurrentAdviceState,
};

export const adviceSlice = createSlice({
  // Slice name in the store
  name: "advices",

  initialState,

  reducers: {
    // Set the list of advices
    setAdvices(state, action: PayloadAction<Advice[]>) {
      state.advices = action.payload.map((advice) => ({
        ...advice,
      }));
    },

    // Clear the list of advices
    resetAdvices(state) {
      state.advices = [];
    },

    // Set the current selected advice
    setCurrentAdvice(state, action: PayloadAction<Advice>) {
      state.currentAdvice = { ...action.payload };
    },

    // Reset current advice to initial state
    resetCurrentAdvice(state) {
      state.currentAdvice = initialCurrentAdviceState;
    },
  },
});

export const {
  setAdvices,
  resetAdvices,
  setCurrentAdvice,
  resetCurrentAdvice,
} = adviceSlice.actions;

// Reducer for store
export default adviceSlice.reducer;

// Selectors

// Select all advices
export const selectAdviceData = (state: RootState) => state.advices.advices;

// Select current advice
export const selectCurrentAdvicesData = (state: RootState) =>
  state.advices.currentAdvice;

// Filter advices based on utility filter text
export const selectFilteredadvices = createSelector(
  [selectAdviceData, selectUtilityFilter],
  (advices, filter) => {
    const text = filter?.searchText?.toLowerCase() || "";

    return advices.filter((advice: Advice) => {
      const titleMatch = text
        ? (advice.title?.toLowerCase() || "").includes(text)
        : true;

      return titleMatch;
    });
  }
);
