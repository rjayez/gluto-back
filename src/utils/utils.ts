/**
 * Random inclusive
 * @param start
 * @param end
 * @returns {number}
 */
export function getRandomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

// QI entre -100 et 250
export function getQI(): number {
  return Math.floor(Math.random() * 351 - 100);
}

// AGE entre 0 et 120.
export function getAge(): string {
  const age = Math.floor(Math.random() * 121);
  if (age === 1 || age === 0) {
    return `${age} an.`;
  }
  return `${age} ans.`;
}
