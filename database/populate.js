var {Comment} = require('./models.js');

var jsonData = require('./MOCK_DATA.json')

// Fill in the definition of insertAllPokemon so that when 
// this file is run in the terminal with `node insertAllPokemon.js`, 
// all 151 pokemon are inserted into the database

Comment.collection.insertMany(jsonData, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
})

// NOTE: DO NOT invoke this function as part of your
// server code - it is meant to only be run once so that
// you have access to data to work with
// dataPopulator();

// module.exports.dataPopulator = dataPopulator