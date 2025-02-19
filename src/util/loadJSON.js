/**
 * Load JSON file using a fetch GET request.
 * @param {string} url - URL to load.
 * @returns {Promise<string>} The parsed JSON data.
 */
export async function loadJSON(url) {
  const response = await fetch(url);
  const json = await response.json();
  return JSON.stringify(json);
}
