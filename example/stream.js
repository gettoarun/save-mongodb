var Db = require('tingodb')().Db // npm install tingodb
  , save = require('save') // npm install save
  , savetingodb = require('..')
  , es = require('event-stream')
  // Create a db object to a local tingodb database called SimpleExample.
  , db = new Db('/Users/arunkumar/testDB', {})

// Open your tingodb database.
db.open(function (error, connection) {

  // Get a collection. This will create the collection if it doesn't exist.
  connection.collection('contact', function (error, collection) {

    // Create a save object and pass in a tingodb engine.
    var contactStore = save('Contact', { engine: savetingodb(collection) })

    // Then we can create a new object.
    contactStore.create({ name: 'Paul', email: 'paul@serby.net' }, function () {

      contactStore.find({})
        .pipe(es.map(function(data, cb) {
          console.log(data)
          cb()
        }))
        .on('end', function() {
          connection.close()
        })

    })

  })
})
