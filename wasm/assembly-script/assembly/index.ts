// The entry file of your WebAssembly module.
declare function log(arg0: i32): void;
declare function time(): void;
declare function timeEnd(): void;

const MAX_AUTHORS: u16 = 10_000;

export function createLines(length: i32): StaticArray<u16> {
  const lines = new StaticArray<u16>(length);
  for (let i = 0; i < length; i++) {
    lines[i] = (i % MAX_AUTHORS) as u16;
  }
  return lines;
}

export function main(): void {
  const lines = createLines(250_000 * 1000);
  const linesByAuthor = new StaticArray<u32>(MAX_AUTHORS);
  time();
  const n = lines.length;
  for (let i = 0; i < n; i++) {
    unchecked((linesByAuthor[lines[i]] += 1));
  }
  timeEnd();
}
