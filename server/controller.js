var {Comment} = require('../database/models.js');
var {House} = require('../database/models.js');

const controller = {

  get: (req, res) => {
    console.log('in get');
    var houseNum = Math.floor(Math.random() * 100) + 1 
    Comment.find({House: houseNum}, (err, docs) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(docs)
      };
    })
  },
  
  post: (req, res) => {
    console.log(req.body);
    Comment.find({Text: {$regex: req.body.Text, $options: 'i'}, House: req.body.House}, (err, docs) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(docs)
      }
    })
  },

};

module.exports.controller = controller;