import { User } from "../../interfaces/User";

export const getImcCategory = (imc: number): string => {
  switch (true) {
    case imc < 18.5:
      return "Bajo peso";
    case imc < 25:
      return "Normal";
    case imc < 30:
      return "Sobrepeso";
    case imc < 35:
      return "Obesidad grado 1";
    default:
      return "Obesidad grado 2 ";
  }
};

export const calculateImc = (row: User): string => {
  if (row.infoUser && row.infoUser.height > 0) {
    const imc =
      row.infoUser.weight / (row.infoUser.height * row.infoUser.height);
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

export const getAgeRange = (age: number): string => {
  switch (true) {
    case age <= 18:
      return "0-18";
    case age <= 30:
      return "19-30";
    case age <= 45:
      return "31-45";
    case age <= 60:
      return "46-60";
    default:
      return "60+";
  }
};
