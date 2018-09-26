var mongoose = require('mongoose');
require('./index');

var commentsSchema = new mongoose.Schema({
  id: Number,
  User: String,
  Name: String,
  ImageUrl: String,
  Date: String,
  AccuracyRating: Number,
  CommunicationRating: Number,
  CleanlinessRating: Number,
  LocationRating: Number,
  CheckInRating: Number,
  ValueRating: Number,
  Text: String,
  House: Number
});

var Comment = mongoose.model('Comment', commentsSchema);

module.exports.Comment = Comment;
