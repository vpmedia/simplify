export class AbstractLogHandler {
  /**
   * Abstract log handler.
   * @param {number} level - Log level.
   */
  constructor(level) {
    this.level = level;
  }

  /**
   * Emit log record.
   * @param {string} target - Log target.
   * @param {string} levelName - Log level.
   * @param {string} message - Log message.
   * @param {object} extraData - Log extra data.
   * @param {Error} exception - Log extra data.
   * @throws {Error}
   */
  emit(target, levelName, message, extraData, exception) {
    throw new Error('Not implemented.');
  }
}
