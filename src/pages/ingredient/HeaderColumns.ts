import { formatDate } from "../user/HeaderColumns";

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
      align: "center",
    },
    {
      id: "creationDate",
      label: "Fecha Creación ",
      minWidth: 170,
      align: "center",
      format: (value: unknown) => formatDate(value),
    },
  ];
};

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
