var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/betterbnb");

var db = mongoose.connection;

db.on("error", error => {
  console.log("Error connecting to database:", error);
});

db.once("open", () => {
  console.log("Success connecting to database!");
});

module.exports.db = db;
