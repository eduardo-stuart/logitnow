/**
 * Plug and Play class that prints custom log messages using the following fields:
 *    **Category**: the category (kind) of this log message
 *    **Tag**: some identification that can be used to filter all the logs
 *    **Message**: the message that will be printed
 *    **xtraInfo**: optional object that will be printed at the end
 * 
 * Created by: Eduardo Stuart (https://eduardostuart.pro.br/)
 */

 class LogIt {

  #defaultCategory = '[INFO]'
  #defaultTag = null
  #timestamp = false

  /**
   * 
   * @param {string} message The message that will be printed; is none is specified, this method does nothing
   * @param {string} category The category of this log message; the *default* is **INFO**
   * @param {string} tag  The tag of this log message; the *default* is **null**
   * @param {object} xtra Object with extra info that can be printed; it is optional
   * @returns 
   */
  now(message, category, tag, xtra) {

    if (!message) return
    const currentTimeStamp = this.#timestamp ? `{ ${new Date().toISOString()} } ` : ''
    const theCategory = category ? `[${String(category).trim().toUpperCase()}]` : this.#defaultCategory
    const theTag = tag ? `(${String(tag).trim().toUpperCase()})` : this.#defaultTag
    const xtraInfo = xtra ? `\n${JSON.stringify(xtra, null, 4)}` : null
    const fullMessage = `${currentTimeStamp}${theCategory ? theCategory : ""}${theTag ? " " + theTag : ""} ${message} ${xtraInfo ? xtraInfo : ""}`
  
    switch(theCategory) {
      case 'INFO':
        return console.info(fullMessage)
      case 'ERROR':
        return console.error(fullMessage)
      case 'WARN':
        return console.warn(fullMessage)
      case 'DEBUG':
        return console.debug(fullMessage)
      default:
        return console.log(fullMessage)
    }    
  }

  /**
   * @param {string} newCategory The category that will be the default for the next log messages
   */
  setCategory(newCategory) {
    this.#defaultCategory = newCategory 
      ? typeof newCategory === 'string' ? `[${newCategory.trim().toUpperCase()}]` : '[INFO]'
      : '[INFO]'
  }

  /**
   * @param {string} newTag The tag that will be the default for the next log messages
   */
  setTag(newTag) {
    this.#defaultTag = newTag
      ? typeof newTag === 'string' ? `(${newTag.trim().toUpperCase()})` : null
      : null
  }

  /**
   * Will the log messages includes a timestamp?
   * @param {boolean} choice 
   */
  includeTimestamp(choice) {
    this.#timestamp = choice
      ? typeof choice === 'boolean' ? choice : false
      : false
  }
}

module.exports = LogIt