import { User } from "../../interfaces/User";
import { calculateImc, formatDate } from "../../store/users/UtitilitySelector";

export const dataHeaderUsers = () => {
  return [
    {
      id: "name",
      label: "Nombre",
      minWidth: 150,
    },
    {
      id: "imc",
      label: "IMC",
      minWidth: 100,
      format: (_value: unknown, row: User) => calculateImc(row),
    },
    {
      id: "sex",
      label: "Sexo",
      minWidth: 100,
      format: (_value: unknown, row: User) => row.infoUser?.sex || "N/A",
    },
    {
      id: "age",
      label: "Edad",
      minWidth: 100,
      format: (_value: unknown, row: User) => row.infoUser?.age ?? "N/A",
    },
    {
      id: "registrationDate",
      label: "Fecha Creación Cuenta",
      minWidth: 170,
      format: (value: unknown) => formatDate(value),
    },
  ];
};
