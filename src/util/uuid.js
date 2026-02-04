/* eslint-disable no-bitwise, unicorn/number-literal-case */

export const hex = (s, b) => s + (b >>> 4).toString(16) + (b & 0b1111).toString(16);

export const randomUUIDFallback = () => {
  const r = crypto.getRandomValues
    ? crypto.getRandomValues(new Uint8Array(16))
    : Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));
  r[6] = (r[6] & 0x0f) | 0x40;
  r[8] = (r[8] & 0x3f) | 0x80;
  return [...r].reduce((uuid, b, i) => uuid + hex(i === 4 || i === 6 || i === 8 || i === 10 ? '-' : '', b), '');
};

if (!crypto.randomUUID) {
  // @ts-expect-error
  crypto.randomUUID = randomUUIDFallback;
}

export const uuidv4 = () => crypto.randomUUID();
