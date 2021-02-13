export function getIntInRangeFromString(
  text: string,
  defaultValue: number,
  min: number = 1,
  max: number = 100
) {
  const value = parseInt(text || `${defaultValue}`);
  if (value > max) return max;
  if (value < min) return min;
  return value;
}
