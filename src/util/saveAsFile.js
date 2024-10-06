/**
 * Saves text file.
 * @param {string} filename - File name.
 * @param {string} text - File content.
 */
export const saveAsFile = (filename, text) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.append(element);
  element.click();
  element.remove();
};
