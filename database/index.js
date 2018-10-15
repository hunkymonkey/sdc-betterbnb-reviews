var mongoose = require("mongoose");
mongoose.connect("mongodb://sdc:sdc@54.183.239.84/betterbnb");

var db = mongoose.connection;

db.on("error", error => {
  console.log("Error connecting to database:", error);
});

db.once("open", () => {
  console.log("Success connecting to database!");
});

module.exports.db = db;
