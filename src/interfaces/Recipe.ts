import { Ingredient } from "./Ingredient";

export interface Recipe {
  id: number;
  name: string;
  preparation: string;
  ingredients: Ingredient[];
}
