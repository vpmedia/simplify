/**
 * Purges object properties to free up memory.
 * @param {{}} target - The target object.
 */
export const purgeObject = (target) => {
  if (!target) {
    return;
  }
  const reference = target;
  for (const entry of Object.keys(target)) {
    reference[entry] = null;
  }
};
