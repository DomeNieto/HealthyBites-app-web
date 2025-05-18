import { User } from "../../interfaces/User";

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

export const calculateImc = (row: User): string => {
  if (
    row.infoUser &&
    typeof row.infoUser.height === "number" &&
    typeof row.infoUser.weight === "number" &&
    row.infoUser.height > 0
  ) {
    const heightInMeters = row.infoUser.height / 100;
    const imc = row.infoUser.weight / (heightInMeters * heightInMeters);
    return imc.toFixed(1);
  }
  return "N/A";
};

export const formatDate = (value: unknown): string => {
  try {
    const dateValue = String(value);
    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  } catch (e) {
    console.error("Error formatting date:", value, e);
    return String(value);
  }
};
