/**
 * Merge two objects.
 * @param {object} target - Target merge object.
 * @param {object} source - Source merge object.
 * @returns {object} Merged result object.
 */
export const deepMerge = (target, source) => {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;

  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }

  return target;
};
