const faker = require("faker");
const fs = require("fs");

const rating = () => {
  return Math.floor(Math.random() * 10 + 1);
};

const stream = fs.createWriteStream("./mockdata.csv", { flags: "a" });

const populate = writer => {
  let houseID = 0;
  let i = 10000000;
  const write = () => {
    let ok = true;
    do {
      i--;
      houseID++;
      const data = 
        i + ',' 
        + faker.lorem.word() + ','
        + faker.name.firstName() + ','
        + faker.image.avatar() + ','
        + faker.date.recent() + ','
        + rating() + ','
        + rating() + ','
        + rating() + ','
        + rating() + ','
        + rating() + ','
        + rating() + ','
        + faker.lorem.paragraph() + ','
        + houseID + '\n';
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

// mysql -u root  --local-infile=1 betterbnb
// show variables like 'local_infile';
// set global local_infile = ON;
// LOAD DATA LOCAL INFILE '/Users/servandojbernarico/Downloads/HackReactor/betterbnb-reviews/mockdata.csv' INTO TABLE comments FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';
// CREATE TABLE comments (
// 	id INT NOT NULL,
// 	User VARCHAR(40) NOT NULL,
// 	Name VARCHAR(40) NOT NULL,
// 	ImageUrl VARCHAR(255) NOT NULL,
// 	Date VARCHAR(80) NOT NULL,
// 	AccuracyRating INT NOT NULL,
// 	CommunicationRating INT NOT NULL,
// 	CleanlinessRating INT NOT NULL,
// 	LocationRating INT NOT NULL,
// 	CheckInRating INT NOT NULL,
// 	ValueRating INT NOT NULL,
// 	Text VARCHAR(255) NOT NULL,
// 	House INT NOT NULL,
// 	PRIMARY KEY (id)
// );