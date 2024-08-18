const range = (a: number, b: number, interval: number = 1) => Array.from({ length: (b - a) / interval }, (_, i) => i * interval + a);
const clone = (original: any) => Object.assign(Object.create(Object.getPrototypeOf(original)), original);
const mod = (x: number, n: number) => ((x % n) + n) % n;

export { range, clone, mod };
