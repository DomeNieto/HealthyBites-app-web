import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectUtilityFilter } from "../utilities/UtitlitySlice";
import { Ingredient } from "../../interfaces/Ingredient";
import { AccInterface } from "../../interfaces/Selector";

// Ingredient slice

// Ingredient state structure
export interface IngredientState {
  ingredients: Ingredient[];
  currentIngredient: Ingredient;
}

// Initial state of the crrent ingredient
const initialCurrentIngredientState: Ingredient = {
  id: 0,
  name: "",
  quantity: 0,
  quantityCalories: 0,
  creationDate: "",
};

// Initial state of the active ingredient
const initialState: IngredientState = {
  ingredients: [],
  currentIngredient: initialCurrentIngredientState,
};

// Redux slice to manage ingredients
export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    // Save the complete list of ingredients
    setIngredients(state, action: PayloadAction<Ingredient[]>) {
      state.ingredients = action.payload.map((ingredient) => ({
        ...ingredient,
      }));
    },

    // Clean all the ingredients
    resetIngredients(state) {
      state.ingredients = [];
    },

    // Sets a current ingredient
    setCurrentIngredient(state, action: PayloadAction<Ingredient>) {
      state.currentIngredient = { ...action.payload };
    },

    // Reset the current ingredient to the initial state
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

// Selector to get all ingredients from global state
export const selectIngredientsData = (state: RootState) =>
  state.ingredients.ingredients;

// Selector to get the currently selected ingredient
export const selectCurrentIngredientsData = (state: RootState) =>
  state.ingredients.currentIngredient;

// Selector for Filtering Ingredients
export const selectFilteredIngredients = createSelector(
  [selectIngredientsData, selectUtilityFilter],
  (ingredients, filter) => {
    const text = filter?.searchText?.toLowerCase() || "";

    const number = filter?.searchNumber || "";

    return ingredients.filter((ingredient: Ingredient) => {
      const nameMatch = text
        ? (ingredient.name?.toLowerCase() || "").includes(text)
        : true;

      const caloriesMatch = number
        ? ingredient.quantityCalories?.toString().includes(number.toString())
        : true;
      return nameMatch && caloriesMatch;
    });
  }
);

// Selector to Calculate Ingredients with More Calories
export const selectHighestCalorieIngredients = createSelector(
  [selectIngredientsData],
  (ingredients) => {
    const calorieMap = ingredients
      .filter((ingredient) => ingredient.active)
      .reduce((acc: AccInterface, ingredient) => {
        acc[ingredient.name] =
          (acc[ingredient.name] || 0) + ingredient.quantityCalories;
        return acc;
      }, {});

    return Object.entries(calorieMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .reduce((acc, [name, calories]) => {
        acc[name] = calories;
        return acc;
      }, {} as AccInterface);
  }
);
