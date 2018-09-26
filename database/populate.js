var { Comment } = require("./models.js");

var jsonData = require("./MOCK_DATA.json");

for (let i = 0; i < 10000; i++) {
  Comment.collection.insertMany(jsonData, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Success saving data in database");
    }
  });
}
