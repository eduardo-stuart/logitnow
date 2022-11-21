# LogItNow

A simple, yet powerful logger

---

## Objective

Easily prints message logs with custom fields that can be specified for each message (or defined as default).

Builded to simplify the creation of log messages that can be easily searched by **category**, **tag**, **message** and **object contents**

---

## Requirements

This library requires **Node.js v12.x** or higher.

---

## Examples of Use

The main method to print a message is **LogIt.now**. It accepts four params:

```
LogIt.now(message: string, category: string, tag: string, xtra: object): void
```

---

## Details 

* **Message**: the message that will be printed
  * If no message is defined, this method does nothing

* **Category**: the category of this log message
  * Examples: **INFO**, **DEBUG**, **WARN**, **ERROR**
  * By *default*, this field's value is **INFO**
  * You can specify any string that suits your needs
  * If you use **INFO**, **WARN**, **ERROR**, etc, the respective *console* command will be used (*console.info*, *console.warn*, *console.error*, etc)
  * If you use some custom string, the console's command will be **log** (*console.log*)

* **Tag**: some tag for this log message; it can be used to help filtering all the logs for a specific tag
  * By *default*, this field's value is **null**

* **Extra Info**: Optional object that will be printed at end of the message

---

## Simplest Use Case

To print a message, use the **now** method with just the message:

```javascript
const LogIt = require("logitnow")

const log = new LogIt()

log.now('Testing the New Log System')
```

This will print on the terminal:

```
[INFO] Testing the New Log System 
```
---

## Specifying a Category and a Tag

For each message, you can inform the **category** and the **tag**

```javascript
const LogIt = require("logitnow")

const log = new LogIt()

log.now('Error Trying to Connect to the Database', 'ERROR', 'Main Application')
```

This will print on the terminal:

```
[ERROR] (MAIN APPLICATION) Error Trying to Connect to the Database 
```

---

## Set a default **Category** and **Tag**

You can set a default value for a **category** and **tag**. These will be used if no category or tag is defined on the **now** method.

```javascript
const LogIt = require("logitnow")

const log = new LogIt()

log.now('Using the default values')

// Setting a default category
log.setCategory('DEBUG')

log.now('Start the debug session')

// Setting a default tag
log.setTag('Best App Ever')

log.now('Creating new database connection')

// You still can specify a category and/or tag for each log message, without losing the defaults
log.now('This is not a problem that we will fix right now', 'ERROR')

// Using the *default*
log.now('In case of error, we will retry this ten times...')
```

These commands will print the following messages:

```
[INFO] Using the default values 
[DEBUG] Start the debug session 
[DEBUG] (BEST APP EVER) Creating new database connection 
[ERROR] (BEST APP EVER) This is not a problem that we will fix right now 
[DEBUG] (BEST APP EVER) In case of error, we will retry this ten times... 
``` 
---

## Using the Flat Format

If you want the output to be printed on a single line, you can set this using **setFlat**'s method.

Consider the following object:

```
const customer = {
  name: 'John',
  code: 23,
  list: [
    { item: 'Orange Juice', quantity: 3, price: '23.99' },
    { item: 'Chips', quantity: 2, price: '12.49' },
  ]
}
``` 

If you log this object using the default values:
```
...
  log.now('Shop Items', 0, 0, customer)
...
```
This is what it will be printed on terminal:

```
[INFO] Shopping Items 
{
  "name": "John",
  "code": 23,
  "list": [
    {
      "item": "Orange Juice",
      "quantity": 3,
      "price": "23.99"
    },
    {
      "item": "Chips",
      "quantity": 2,
      "price": "12.49"
    }
  ]
}
```

It's more ease to read, but not always the best option. Using multi-lines for each message can produce bad results for others systems (like **Kibana**). If you need that each log message uses only one line, you can either:

* Set **isFlat** as default
* Call the **flat** method, that accepts the same arguments as the method **now** (more details below)

### Example setting TRUE to *isFlat*

```
const log = new (require('./index'))()
log.setFlat(true)

const customer = {
  name: 'John',
  code: 23,
  list: [
    { item: 'Orange Juice', quantity: 3, price: '23.99' },
    { item: 'Chips', quantity: 2, price: '12.49' },
  ]
}

log.now('Shopping Items', 0, 0, customer)
```

This will be the result:

```
[INFO] Shopping Items {"name":"John","code":23,"list":[{"item":"Orange Juice","quantity":3,"price":"23.99"},{"item":"Chips","quantity":2,"price":"12.49"}]}
```

You can also ignore the defaults, using two methods (note that both uses the same parameters of **LogIt.now**):

```
LogIt.flat(message: string, category: string, tag: string, xtra: object): void
LogIt.pretty(message: string, category: string, tag: string, xtra: object): void
```

**LogIt.flat** will print the message in only one line, despite the default; and **LogIt.pretty** will print it in a more human friendly fashion, also despite the default.

--- 

## Reset to Defaults

You can reset **category's value**,  **tag's value** and **isFlat's flag** calling these methods without any parameter:

```javascript
const LogIt = require("logitnow")

const log = new LogIt()
...
log.setCategory()
log.setTag()
log.setFlat()
...
```


<img referrerpolicy="no-referrer-when-downgrade" src="https://matomo.eduardostuart.pro.br/matomo.php?idsite=13&amp;rec=1" style="border:0" alt="" />

--- 

## Include an Object with Extra Info

You can create an object, or use one already created, to be assigned on the message.

```javascript
const LogIt = require("logitnow")

const log = new LogIt()

log.now('Error trying to connect to remote server', 'ERROR', null, { endpoint: 'test.com/endpoint', timestamp: new Date(), releaseCode: '0.01a'})
```

This will print the following message:

```
[ERROR] Error trying to connect to remote server 
{
    "endpoint": "test.com/endpoint",
    "timestamp": "2022-03-21T16:24:15.737Z",
    "releaseCode": "0.01a"
}
```
---

## Include a Timestamp

To include the timestamp before each log message, call the method **showTimestamp()** with *true* as argument.

```
const log = new (require("logitnow"))()

log.now('Testing with default values')
log.includeTimestamp(true)
log.now('Now with timestamp')
log.includeTimestamp(false)
log.now('Timestamp deactivated')
```

This will print the following messages on the terminal:

```
[INFO] Testing with default values 
{ 2022-03-28T17:44:59.864Z } [INFO] Now with timestamp 
[INFO] Timestamp deactivated
```

To deactivate, use the same method, but passing *false* as argument.


---

## Restrict the Display of Log Messages

It's possible to publish the Log's messages only if a specific **NODE_ENV** is set.

For example, if you want to print all the messages when in **DEVELOPMENT** environment, set the NODE_ENV environment to **development** and set the following command:

```
log.setOnlyEnvironment('development')
```

To reset, so that all the messages will be printed again for now on, use the same method, but passing **null** as argument.

```
log.setOnlyEnvironment('development')
```

You can set/unset this at any time, turning on/off if the messages will or will not be printed.

## Always Print Error Messages

If you want to always print error messagens, despite how **_setOnlyEnvironment_** is set, set **true** to **setAlwaysPrintOnErrors**:

```
log.setAlwaysPrintOnErrors(true)
```

To deactivate this, call the same method, but using **false** as parameter.

## Ignore All Environment Filters

If you need to ignore all environment filters, printing all messages despite the environment, set **1** as **IGNORE_ENVIRONMENT_FILTERS** environment's variable. Any value different of **1** will be considered **false**.

---

## History

**v1.2.1**: New features: added support to always print on terminal when an "error" occurs; you can now ignore all environment filters (all messages will be printed); Fix: tag will no be printed as UPPERCASE anymore

**v1.2.0**: Added support to print the log messages only if the project is running with a especific environment variable for NODE_ENV

**v1.1.0**: Added support to print the message using flat format

**v1.0.6**: Added support to print the current date and time at the beginning of the message

**v1.0.1~v1.0.5**: Minor fixes

**v1.0**: Initial Release