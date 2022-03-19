const MAX_AUTHORS = 10_000;

export function createLines(length: number): Uint16Array {
  const lines = new Uint16Array(length);
  for (let i = 0; i < length; i++) {
    lines[i] = i % MAX_AUTHORS;
  }
  return lines;
}

export function main(): void {
  const lines = createLines(25_000 * 1000);

  const linesByAuthor = new Uint32Array(MAX_AUTHORS);
  console.time();
  let n = lines.length;
  for (let i = 0; i < n; i++) {
    linesByAuthor[lines[i]] += 1;
  }
  console.timeEnd();
}

for (let i = 0; i < 10; i++) {
  main();
}
