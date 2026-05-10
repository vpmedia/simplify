/**
 * Convert a byte (0–255) to a 2-character hex string.
 */
export const byteToHex = (byte: number): string => (byte >>> 4).toString(16) + (byte & 0b1111).toString(16);

/**
 * UUIDv4 fallback generator (RFC 4122 compliant).
 */
export const randomUUIDFallback = (): string => {
  const bytes: number[] | Uint8Array = crypto.getRandomValues
    ? crypto.getRandomValues(new Uint8Array(16))
    : Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));

  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;

  let uuid = '';
  for (let index = 0; index < bytes.length; index += 1) {
    if (index === 4 || index === 6 || index === 8 || index === 10) {
      uuid += '-';
    }
    uuid += byteToHex(bytes[index]!);
  }
  return uuid;
};

/**
 * Crypto UUIDv4 wrapper with fallback.
 */
export const uuidv4 = (): string =>
  typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : randomUUIDFallback();
