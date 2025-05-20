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

export const categories = [
  "Bajo peso",
  "Normal",
  "Sobrepeso",
  "Obesidad grado 1",
  "Obesidad grado 2",
];
