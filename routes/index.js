var express = require('express'),
    router  = express.Router();

router.get('/', function (req, res) {
  res.render('index', { title: 'mygamedev', page: 'index' });
});

module.exports = router;
