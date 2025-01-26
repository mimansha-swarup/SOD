export function generateNeonColor() {
  // Define a range of colors that resemble a neon palette
  const neonColors = [
    "#FF00FF", // Neon Pink
    "#00FFFF", // Cyan
    "#00FF00", // Neon Green
    "#FF9900", // Bright Orange
    "#9900FF", // Purple
    "#FF007F", // Hot Pink
    "#FFFF00", // Bright Yellow
    "#00FF7F", // Spring Green
    "#7F00FF", // Vivid Violet
    "#FF4500", // Orange-Red
    "#39FF14", // Electric Green
    "#1E90FF", // Neon Blue
    "#FF1493", // Deep Pink
    "#8A2BE2", // Electric Purple
    "#FFD700", // Bright Gold
  ];

  // Pick a random color from the neon palette
  const randomIndex = Math.floor(Math.random() * neonColors.length);
  return neonColors[randomIndex];
}

export const randomNumberGenerator = (max: number): number => {
  return Math.floor(Math.random() * max);
};
