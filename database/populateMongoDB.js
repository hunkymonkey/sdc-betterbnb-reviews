const faker = require("faker");
const fs = require("fs");

const rating = () => {
  return Math.floor(Math.random() * 10 + 1);
};

const stream = fs.createWriteStream("./mockdata.json", { flags: "a" });

const populate = writer => {
  let i = 10000000;
  const write = () => {
    let ok = true;
    do {
      i--;
      const comment = {
        id: i,
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
      const data = JSON.stringify(comment, null, 4) + "\n";
      if (i === 0) {
        writer.write(data);
      } else {
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    {
      if (i > 0) {
        writer.once("drain", write);
      }
    }
  };
  write();
};

populate(stream);

//import data to database command:  mongoimport --db betterbnb --collection comments --file mockdata.json
