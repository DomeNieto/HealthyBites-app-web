/**
 * Generates an array of HSL color strings forming a palette with varying lightness.
 * @param size - Number of colors to generate.
 * @returns Array of HSL color strings.
 */
export const generateColorPalette = (size: number): string[] => {
  const colors = [];

  for (let i = 0; i < size; i++) {
    const hue = 280;
    const saturation = 60;
    const lightness = 40 + (i * 50) / size;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
};

// Categories used for BMI classification.
export const categories = [
  "Bajo peso",
  "Normal",
  "Sobrepeso",
  "Obesidad grado 1",
  "Obesidad grado 2",
];
