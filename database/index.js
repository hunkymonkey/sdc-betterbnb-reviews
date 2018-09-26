var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/betterBnB');

var db = mongoose.connection;

db.on('error', () => {
  console.log('error');
});

db.once('open', () => {
  console.log('connected to database!')
});

module.exports.db = db;