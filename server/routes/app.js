var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/scripture-saver/browser/index.html'));
});

module.exports = router;

