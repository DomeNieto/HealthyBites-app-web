export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  quantityCalories: number;
  creationDate: string;
}

export interface IngredientFormData {
  name: string;
  quantityCalories: number;
  creationDate: string;
}
