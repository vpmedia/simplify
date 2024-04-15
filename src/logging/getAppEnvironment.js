/**
 * Returns the application environment identifier.
 * @returns {string} TBD.
 */
export function getAppEnvironment() {
  let appEnvironment = 'local';
  try {
    if (import.meta['env'].VITE_APP_ENVIRONMENT) {
      appEnvironment = import.meta['env'].VITE_APP_ENVIRONMENT;
    }
  } catch {
    // pass
  }
  try {
    if (process.env.APP_ENVIRONMENT) {
      appEnvironment = process.env.APP_ENVIRONMENT;
    }
  } catch {
    // pass
  }
  return appEnvironment;
}
