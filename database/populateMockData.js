const faker = require("faker");
const fs = require("fs");

const rating = () => {
  return Math.floor(Math.random() * 10 + 1);
};

const stream = fs.createWriteStream("./mockdata2.json", { flags: "a" });

for (let i = 0; i < 10000000; i++) {
  if (i % 1000000 === 0) {
    console.log(i);
  }
  const comment = {
    id: faker.random.number(),
    User: faker.lorem.word(),
    Name: faker.name.firstName(),
    ImageUrl: faker.image.avatar(),
    Date: faker.date.recent(),
    AccuracyRating: rating(),
    CommunicationRating: rating(),
    CleanlinessRating: rating(),
    LocationRating: rating(),
    CheckInRating: rating(),
    ValueRating: rating(),
    Text: faker.lorem.paragraph(),
    House: faker.random.number()
  };
  const temp = JSON.stringify(comment, null, 4) + "\t";
  stream.write(temp);
}
