export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  quantityCalories: number;
  creationDate: string;
  active?: boolean;
}
