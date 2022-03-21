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

  defaultCategory = '[INFO]'
  defaultTag = null

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
    const theCategory = category ? `[${String(category).trim().toUpperCase()}]` : this.defaultCategory
    const theTag = tag ? `(${String(tag).trim().toUpperCase()})` : this.defaultTag
    const xtraInfo = xtra ? `\nExtra Info: ${JSON.stringify(xtra, null, 4)}` : null
    const fullMessage = `${theCategory ? theCategory : ""}${theTag ? " " + theTag : ""} ${message} ${xtraInfo ? xtraInfo : ""}`
  
    switch(theCategory) {
      case 'INFO':
        console.info(fullMessage)
        break
      case 'ERROR':
        console.error(fullMessage)
        break
      case 'WARN':
        console.warn(fullMessage)
        break  
      case 'DEBUG':
        console.debug(fullMessage)
        break
      default:
        console.log(fullMessage)
    }    
  }

  /**
   * @param {string} newCategory The category that will be the default for the next log messages
   */
  setCategory(newCategory) {
    this.defaultCategory = newCategory 
      ? typeof newCategory === 'string' ? `[${newCategory.trim().toUpperCase()}]` : '[INFO]'
      : '[INFO]'
  }

  /**
   * 
   * @param {string} newTag The tag that will be the default for the next log messages
   */
  setTag(newTag) {
    this.defaultTag = newTag
      ? typeof newTag === 'string' ? `(${newTag.trim().toUpperCase()})` : null
      : null
  }
}

module.exports = new LogIt()