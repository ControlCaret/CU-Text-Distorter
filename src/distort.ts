const DISTORTION_CHARS = '!@#$%&';

const MAX_INT = 2147483647;

// First sample from the game's seeded System.Random algorithm.
export function getDeterministicRandom(seed: number): number {
  // Initialize slots 1–55; slot 0 is unused.
  const values = new Int32Array(56);
  let previous = 161803398 - Math.abs(seed);
  values[55] = previous;
  let next = 1;

  for (let i = 1; i < 55; i++) {
    const position = (21 * i) % 55;
    values[position] = next;
    next = previous - next;
    if (next < 0) next += MAX_INT;
    previous = values[position]!;
  }

  // Mix the state four times.
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 1; i < 56; i++) {
      let value = values[i]! - values[1 + (i + 30) % 55]!;
      if (value < 0) value += MAX_INT;
      values[i] = value;
    }
  }

  // Draw the first sample.
  let sample = values[1]! - values[22]!;
  if (sample === MAX_INT) sample--;
  if (sample < 0) sample += MAX_INT;

  // Normalize to [0, 1).
  return sample / MAX_INT;
}

export function distortionAmount(brainHealth: number): number {
  const health = Math.max(0, Math.min(100, brainHealth));

  return Math.max(0, (95 - health) / 100);
}

export function distortText(text: string, brainHealth: number): string {
  const amount = distortionAmount(brainHealth);
  if (amount === 0) return text;

  const result = text.split('');

  for (let i = 0; i < text.length; i++) {
    if (getDeterministicRandom(i) < amount) {
      const choice = Math.floor(getDeterministicRandom(i + 128) * DISTORTION_CHARS.length);
      result[i] = DISTORTION_CHARS.charAt(choice);
    }
  }

  return result.join('');
}
