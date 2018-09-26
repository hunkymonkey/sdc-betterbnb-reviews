const router = require('express').Router();
const { controller } = require('./controller.js');

router
  .route('/comments')
  .get(controller.get)
  .post(controller.post)

module.exports = router;