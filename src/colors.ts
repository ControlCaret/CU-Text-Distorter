// PlayerCamera.itemConditionGradient
const conditionColors = [
  [0, 'color(srgb 0.4716981 0.4716981 0.4716981)'],
  [655, 'color(srgb 0.5754717 0 0)'],
  [8481, 'color(srgb 1.0018702 0.10980393 0.003921569)'],
  [31418, 'color(srgb 0.9433962 0.8723648 0.12014952)'],
  [65535, 'color(srgb 0.51479906 1 0.4198113)'],
] as const;

export function conditionColor(percent: number): string {
  const time = Math.min(100, Math.max(0, percent)) / 100 * 65535;
  let previous: readonly [number, string] = conditionColors[0];

  for (const current of conditionColors) {
    if (time === current[0]) return current[1];
    if (time < current[0]) {
      const weight = (time - previous[0]) / (current[0] - previous[0]) * 100;
      return `color-mix(in oklab, ${previous[1]}, ${current[1]} ${weight}%)`;
    }
    previous = current;
  }

  return previous[1];
}
