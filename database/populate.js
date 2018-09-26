var { Comment } = require("./models.js");

var jsonData = require("./MOCK_DATA.json");

Comment.collection.insertMany(jsonData, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success saving data in database");
  }
});
