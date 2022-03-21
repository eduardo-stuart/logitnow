# LogItNow

A simple, yet powerfull logger

---

## Objetive

Easily prints message logs with custom fields that can be specified for each message (or defined as default).

Builded to simplify the creation of log messages that can be easily searched by **category**, **tag**, **message** and **object contents**

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

### Resetting to Defaults

You can reset **category's value** and **tag's value** calling these methods without any parameter:

```javascript
const LogIt = require("logitnow")

const log = new LogIt()
...
log.setCategory()
log.setTag()
...
```


<img referrerpolicy="no-referrer-when-downgrade" src="https://matomo.eduardostuart.pro.br/matomo.php?idsite=13&amp;rec=1" style="border:0" alt="" />

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
Extra Info: {
    "endpoint": "test.com/endpoint",
    "timestamp": "2022-03-21T16:24:15.737Z",
    "releaseCode": "0.01a"
}
```

---

## History

**v1.0**: Initial Release