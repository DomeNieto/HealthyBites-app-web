import { FormFieldConfig } from "../../interfaces/ModalForm";
import { formatDate } from "../../store/users/UtitilitySelector";

// Returns column configuration for the ingredients table
export const dataHeaderIngredients = () => {
  return [
    {
      id: "name",
      label: "Ingrediente",
      minWidth: 150,
    },
    {
      id: "quantityCalories",
      label: "Calorias",
      minWidth: 100,
    },
    {
      id: "creationDate",
      label: "Fecha Creación ",
      minWidth: 170,
      format: (value: unknown) => formatDate(value),
    },
  ];
};

// Configuration for the fields used in the ingredient creation/edit form
export const ingredientFieldsConfig: FormFieldConfig[] = [
  {
    name: "name",
    label: "Nombre del Ingrediente",
    type: "text",
    required: true,
  },
  {
    name: "calories",
    label: "Calorías",
    type: "number",
    required: true,
  },
];
