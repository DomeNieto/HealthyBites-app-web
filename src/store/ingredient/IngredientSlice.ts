import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectUtilityFilter } from "../utilities/UtitlitySlice";
import { Ingredient } from "../../interfaces/Ingredient";
import { AccInterface } from "../../interfaces/Selector";

export interface IngredientState {
  ingredients: Ingredient[];
  currentIngredient: Ingredient;
}

const initialCurrentIngredientState: Ingredient = {
  id: 0,
  name: "",
  quantity: 0,
  quantityCalories: 0,
  creationDate: "",
};

const initialState: IngredientState = {
  ingredients: [],
  currentIngredient: initialCurrentIngredientState,
};

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients(state, action: PayloadAction<Ingredient[]>) {
      state.ingredients = action.payload.map((ingredient) => ({
        ...ingredient,
      }));
    },
    resetIngredients(state) {
      state.ingredients = [];
    },
    setCurrentIngredient(state, action: PayloadAction<Ingredient>) {
      state.currentIngredient = { ...action.payload };
    },
    resetCurrentIngredient(state) {
      state.currentIngredient = initialCurrentIngredientState;
    },
  },
});

export const {
  setIngredients,
  resetIngredients,
  setCurrentIngredient,
  resetCurrentIngredient,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;

export const selectIngredientsData = (state: RootState) =>
  state.ingredients.ingredients;
export const selectCurrentIngredientsData = (state: RootState) =>
  state.ingredients.currentIngredient;

export const selectFilteredIngredients = createSelector(
  [selectIngredientsData, selectUtilityFilter],
  (ingredients, filter) => {
    const text = filter?.searchText?.toLowerCase() || "";

    const number = filter?.searchNumber || "";

    return ingredients.filter((ingredient: Ingredient) => {
      const nameMatch = text
        ? (ingredient.name?.toLowerCase() || "").includes(text)
        : true;

      const calroriesMatch = number
        ? ingredient.quantityCalories?.toString().includes(number.toString())
        : true;
      return nameMatch && calroriesMatch;
    });
  }
);

export const selectHighestCalorieIngredients = createSelector(
  [selectIngredientsData],
  (ingredients) => {
    return ingredients
      .filter((ingredient) => ingredient.active)
      .reduce((acc: AccInterface, ingredient) => {
        acc[ingredient.name] =
          (acc[ingredient.name] || 0) + ingredient.quantityCalories;
        return acc;
      }, {});
  }
);
