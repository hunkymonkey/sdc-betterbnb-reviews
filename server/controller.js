var { Comment } = require("../database/models.js");

const controller = {
  get: (req, res) => {
    Comment.find({ House: req.params.House }, (err, docs) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(docs);
      }
    });
  },

  post: (req, res) => {
    Comment.find(
      { Text: { $regex: req.body.Text, $options: "i" }, House: req.body.House },
      (err, docs) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send(docs);
        }
      }
    );
  }
};

module.exports.controller = controller;
