const mongoose = require('mongoose');

// Use native promises instead of whatever mongoose normally uses. This avoids
// some error messages.
mongoose.Promise = Promise;

// Connect to the database at localhost called 'creativityProject5'
mongoose.connect('mongodb://localhost/cp6-forRealsies', {useMongoClient: true});

// Log errors that happen
mongoose.connection.on('error', function(err) {
        console.error("Database error:", err);
});

// Log when connection is established
mongoose.connection.then(function() {
  console.log("Connected successfully!");
});

module.exports = mongoose;
