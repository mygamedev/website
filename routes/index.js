var express = require('express'),
    router  = express.Router(),
    ipaddr;


require('os')
  .networkInterfaces()['en1']
  .forEach(function (details) {
    if (details.family !== 'IPv4') { return; }
    ipaddr = details.address;
  });

router.get('/', function (req, res) {
  res.render('index', { title: 'mygamedev', ipaddress: ipaddr });
});

module.exports = router;
