import { FormFieldConfig } from "../../interfaces/ModalForm";
import { formatDate } from "../../store/users/UtitilitySelector";

// Returns column configuration for the advice table
export const dataHeaderAdvice = () => {
  return [
    {
      id: "title",
      label: "Título",
      minWidth: 150,
    },
    {
      id: "description",
      label: "Descripción",
      minWidth: 170,
    },
    {
      id: "creationDate",
      label: "Fecha Creación ",
      minWidth: 170,
      format: (value: unknown) => formatDate(value),
    },
  ];
};

// Configuration for the fields used in the advice creation/edit form
export const adviceFieldsConfig: FormFieldConfig[] = [
  {
    name: "title",
    label: "Título",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
  },
];
