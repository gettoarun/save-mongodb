# save-tingodb - tingodb persistence engine for **save**

# * Currently has tests failing.. I will look into this, as such the tingodb tingus driver does not appear to be a drop in replacement to the mongodb api.. Hmm...

## Installation

      npm install save-tingodb

## Usage

I won't bore your with waffle. If you want to see how this works look at the tests or this simple example:

```js
// What you'll need!
var Db = require('tingodb')().Db // npm install tingodb
  , save = require('save') // npm install save
  , saveTingodb = require('..')

  // Create a db object to a local tingodb database called SimpleExample.
  , db = new Db('/tmp/testdb', {})

// Open your tingodb database.
db.open(function (error, connection) {

  // Get a collection. This will create the collection if it doesn't exist.
  connection.collection('contact', function (error, collection) {

    // Create a save object and pass in a tingodb engine.
    var contactStore = save('Contact', { engine: saveTingodb(collection) })

    // Then we can create a new object.
    contactStore.create({ name: 'Paul', email: 'paul@serby.net'}, function (error, contact) {

      // The created 'contact' is returned and has been given an _id
      console.log(contact)

      // Don't forget to close your database connection!
      connection.close()
    })

  })
})
```

### Streaming find()

Find now has a streaming interface

```js

var contactStore = save('Contact', { engine: saveTingodb(collection) })
  , es = require('event-stream')

contactStore.find({})
  .pipe(es.stringify())
  .pipe(process.stdout)

```

## Credits
[Arun N. Kumar](https://github.com/gettoarun/), follow me on twitter [@gettoarun](http://twitter.com/gettoarun)

[Paul Serby](https://github.com/serby/) for the original codebase, follow him on twitter [@serby](http://twitter.com/serby)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
