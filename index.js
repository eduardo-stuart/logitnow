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

  __defaultCategory = '[INFO]'
  __defaultTag = null
  __timestamp = false
  __flatInfo = false
  __environmentVariable = null


  /**
   * Prints the message using the passing parameters or the defaults
   * 
   * @param {string} message The message that will be printed; is none is specified, this method does nothing
   * @param {string} category The category of this log message; the *default* is **INFO**
   * @param {string} tag  The tag of this log message; the *default* is **null**
   * @param {object} xtra Object with extra info that can be printed; it is optional
   */
  now(message, category, tag, xtra) {

    if (this.__environmentVariable && process.env.NODE_ENV && (process.env.NODE_ENV.toUpperCase()) !== this.__environmentVariable) return

    if (!message) return
    const currentTimeStamp = this.__timestamp ? `{ ${new Date().toISOString()} } `: ''
    const theCategory = category ? `[${String(category).trim().toUpperCase()}]` : this.__defaultCategory
    const theTag = tag ? `(${String(tag).trim().toUpperCase()})` : this.__defaultTag
    const xtraInfo = xtra
      ? this.__flatInfo
        ? JSON.stringify(xtra)
        : `\n${JSON.stringify(xtra, null, 2)}`
      : null
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
   * Prints the message using the flat format, despite the actual default setting
   * 
   * @param {string} message The message that will be printed; is none is specified, this method does nothing
   * @param {string} category The category of this log message; the *default* is **INFO**
   * @param {string} tag  The tag of this log message; the *default* is **null**
   * @param {object} xtra Object with extra info that can be printed; it is optional
   */
  flat(message, category, tag, extra) {
    const oldSetting = this.__flatInfo
    this.__flatInfo = true
    this.now(message, category, tag, extra)
    this.__flatInfo = oldSetting
  }

   /**
   * Prints the message using the pretty format, despite the actual default setting
   * 
   * @param {string} message The message that will be printed; is none is specified, this method does nothing
   * @param {string} category The category of this log message; the *default* is **INFO**
   * @param {string} tag  The tag of this log message; the *default* is **null**
   * @param {object} xtra Object with extra info that can be printed; it is optional
   */
  pretty(message, category, tag, extra) {
    const oldSetting = this.__flatInfo
    this.__flatInfo = false
    this.now(message, category, tag, extra)
    this.__flatInfo = oldSetting
  }

  /**
   * @param {string} newCategory The category that will be the default for the next log messages
   */
  setCategory(newCategory) {
    this.__defaultCategory = newCategory 
      ? typeof newCategory === 'string' ? `[${newCategory.trim().toUpperCase()}]` : '[INFO]'
      : '[INFO]'
  }

  /**
   * @param {string} newTag The tag that will be the default for the next log messages
   */
  setTag(newTag) {
    this.__defaultTag = newTag
      ? typeof newTag === 'string' ? `(${newTag.trim().toUpperCase()})` : null
      : null
  }

  setFlat(choice) {
    this.__flatInfo = choice
      ? typeof choice === 'boolean' ? choice : false
      : false
  }

  /**
   * Will the log messages includes a timestamp?
   * @param {boolean} choice 
   */
  includeTimestamp(choice) {
    this.__timestamp = choice
      ? typeof choice === 'boolean' ? choice : false
      : false
  }

  /**
   * What NODE_ENV variable must be set to print the logs on terminal?
   * If set to null (default value), all the messages will be printed.
   * @param {boolean} choice
   */
  setOnlyEnvironment(choice){
    this.__environmentVariable = choice
      ? typeof choice === 'string' ? choice.toUpperCase() : null
      : null
  }
}

module.exports = LogIt