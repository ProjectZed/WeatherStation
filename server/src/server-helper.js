// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();

var bodyParser = require('body-parser');

var ResetDatabase = require('./resetdatabase');

/*Your schemas here!*/
var validate = require('express-jsonschema').validate;

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var dbName = 'weather-station-data';
var url = 'mongodb://localhost:27017/' + dbName;

module.exports = function(cb, done) {
  MongoClient.connect(url, function(err, db) {
    // Support receiving text in HTTP request bodies
    app.use(bodyParser.text());
    // Support receiving JSON in HTTP request bodies
    app.use(bodyParser.json());
    // You run the server from `server`, so `../client/build` is `server/../client/build`.
    // '..' means "go up one directory", so this translates into `client/build`!
    app.use(express.static('../client/build'));
    // Support mongo express
    app.use('/mongo_express', mongo_express(mongo_express_config));

    // Reset database.
    app.post('/resetdb', function(req, res) {
      console.log("Resetting database...");
      ResetDatabase(db, function() {
        res.send();
      })
    });

    /**
     * Get the user ID from a token. Returns "" (an invalid ID) if it fails.
     */
    function getUserIdFromToken(authorizationLine) {
      try {
        // Cut off "Bearer " from the header value.
        var token = authorizationLine.slice(7);
        // Convert the base64 string to a UTF-8 string.
        var regularString = new Buffer(token, 'base64').toString('utf8');
        // Convert the UTF-8 string into a JavaScript object.
        var tokenObj = JSON.parse(regularString);
        var id = tokenObj['id'];
        // Check that id is a string.
        if (typeof id === 'string') {
          return id;
        } else {
          // Not a number. Return "", an invalid ID.
          return "";
        }
      } catch (e) {
        // Return an invalid ID.
        return "";
      }
    }

    function sendDatabaseError(res, err) {
      res.status(500).send("A database error occurred: " + err);
    }

    /**
     * Translate JSON Schema Validation failures into error 400s.
     */
    app.use(function(err, req, res, next) {
      if (err.name === 'JsonSchemaValidation') {
        // Set a bad request http response status
        res.status(400).end();
      } else {
        // It's some other sort of error; pass it to next error middleware handler
        next(err);
      }
    });

    // Starts the server on port 3000!
    var server = app.listen(3000, function() {
      console.log('Weather Station server listening on port 3000!');
    });
    cb(server);
    if (done) {
      done();
    }
  });
};
