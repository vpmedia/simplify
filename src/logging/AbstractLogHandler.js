export class AbstractLogHandler {
  /**
   * Abstract log handler.
   * @param {number} level - Log handler level.
   */
  constructor(level) {
    this.level = level;
  }

  /**
   * Emit log record.
   * @param {import('./Logger.js').Logger} logger - Logger instance.
   * @param {number} timestamp - Log timestamp.
   * @param {number} level - Log level.
   * @param {string} message - Log message.
   * @param {object} extra - Log extra data.
   * @param {Error} error - Log extra data.
   * @throws {Error}
   */
  emit(logger, timestamp, level, message, extra, error) {
    throw new Error('Not implemented.');
  }
}
