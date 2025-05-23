import { User } from "../../interfaces/User";

/**
 * Returns the BMI category based on the numerical value provided.
 * @param imc - Body Mass Index (BMI)
 * @returns Category as string
 */
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
      return "Obesidad grado 2";
  }
};

/**
 * Calculates a user's BMI from their weight and height.
 * @param row - Object of type "User" that contains the user information
 * @returns BMI as a formatted string (1 decimal), or "N/A" if it cannot be calculated
 */
export const calculateImc = (row: User): string => {
  if (row.infoUser && row.infoUser.height > 0) {
    const heightInMeters = row.infoUser.height / 100;
    const imc = row.infoUser.weight / (heightInMeters * heightInMeters);
    return imc.toFixed(1);
  }
  return "N/A";
};

/**
 * Formats a date in short format: dd/mm/yy.
 * @param value - Date in any format valid for "Date"
 * @returns Date formatted as string or "Invalid Date" if it cannot be interpreted
 */
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
    console.error("Error date:", value, e);
    return String(value);
  }
};

/**
 * Classifies an age number in a certain range.
 * @param age - Numeric age
 * @returns Age range as string
 */
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
