const faker = require("faker");
var { Comment } = require("./models.js");
var jsonData = require("./MOCK_DATA.json");

let x = 0;
for(let i = 0; i < 1000; i++) {
  jsonData.forEach(comment => {
    Comment.create({
      id: faker.random.number(),
      User: faker.lorem.word(),
      Name: faker.name.firstName(),
      ImageUrl: comment.ImageUrl,
      Date: faker.date.recent(),
      AccuracyRating: comment.AccuracyRating,
      CommunicationRating: comment.CommunicationRating,
      CleanlinessRating: comment.CleanlinessRating,
      LocationRating: comment.LocationRating,
      CheckInRating: comment.CheckInRating,
      ValueRating: comment.ValueRating,
      Text: comment.Text,
      House: faker.random.number()
    })
    console.log(x)
    x++;
  });
}


