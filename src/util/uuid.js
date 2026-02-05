/* eslint-disable no-bitwise, unicorn/number-literal-case */

/**
 * Convert a byte (0–255) to a 2‑character hex string.
 * @param {number} byte - Byte value.
 * @returns {string} Hex value.
 */
export const byteToHex = (byte) => (byte >>> 4).toString(16) + (byte & 0b1111).toString(16);

/**
 * UUIDv4 fallback generator (RFC 4122 compliant).
 * @returns {string} UUIDv4 string.
 */
export const randomUUIDFallback = () => {
  const bytes = crypto.getRandomValues
    ? crypto.getRandomValues(new Uint8Array(16))
    : Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));

  // RFC 4122 version & variant bits
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  let uuid = '';
  for (const [index, byte] of bytes.entries()) {
    if (index === 4 || index === 6 || index === 8 || index === 10) {
      uuid += '-';
    }
    uuid += byteToHex(byte);
  }
  return uuid;
};

/**
 * Crypto UUIDv4 wrapper with fallback.
 * @returns {string} UUIDv4 string.
 */
export const uuidv4 = () => (typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : randomUUIDFallback());
