var Db = require('tingodb')().Db // npm install tingodb
  , save = require('save') // npm install save
  , savetingodb = require('..')

  // Create a db object to a local tingodb database called SimpleExample.
  , db = new Db('/Users/arunkumar/testDB', {})

// Open your tingodb database.
db.open(function (error, connection) {
    console.log("Db.open done");
  // Get a collection. This will create the collection if it doesn't exist.
  connection.collection('contact', function (error, collection) {

    console.log("Collection.contact  done");
    // Create a save object and pass in a tingodb engine.
    var contactStore = save('Contact', { engine: savetingodb(collection) })

    // Then we can create a new object.
    contactStore.create({ name: 'Paul', email: 'paul@serby.net' }, function (error, contact) {

      // The created 'contact' is returned and has been given an _id
      console.log(contact)

      // Don't forget to close your database connection!
      connection.close()
    })

  })
})
