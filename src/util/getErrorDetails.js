/**
 * Retrieves detailed information from an error object.
 * @param {Error} error - The error to extract details from.
 * @param {string[]} [excludes] - An array of property names to exclude from the result.
 * @returns {object} - An object containing the error details.
 */
export const getErrorDetails = (error, excludes = ['stack']) => {
  const errorDetails = {
    name: error.name,
    type: error.constructor?.name ?? typeof error,
  };
  if (error.message) {
    errorDetails.message = error.message;
  }
  if (error.cause) {
    errorDetails.cause = error.cause;
  }
  for (const key of Object.getOwnPropertyNames(error)) {
    if (!excludes.includes(key)) {
      errorDetails[key] = error[key];
    }
  }
  return errorDetails;
};
