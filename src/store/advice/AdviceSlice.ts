import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advice } from "../../interfaces/Advices";
import { RootState } from "../store";
import { selectUtilityFilter } from "../utilities/UtitlitySlice";

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

const initialState: AdviceState = {
  advices: [],
  currentAdvice: initialCurrentAdviceState,
};

export const adviceSlice = createSlice({
  name: "advices",
  initialState,
  reducers: {
    setAdvices(state, action: PayloadAction<Advice[]>) {
      state.advices = action.payload.map((advice) => ({
        ...advice,
        isNew: false,
      }));
    },
    resetAdvices(state) {
      state.advices = [];
    },
    setCurrentAdvice(state, action: PayloadAction<Advice>) {
      state.currentAdvice = { ...action.payload };
    },
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

export default adviceSlice.reducer;

export const selectAdviceData = (state: RootState) => state.advices.advices;
export const selectCurrentAdvicesData = (state: RootState) =>
  state.advices.advices;

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
