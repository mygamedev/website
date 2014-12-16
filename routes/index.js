'use strict';

var express = require('express'),
    router  = express.Router();

router.get('/',          function (req, res) { res.render('index',     {title: 'mygamedev',           page: 'index'}); });
router.get('/about',     function (req, res) { res.render('about',     {title: 'about mygamedev',     page: 'about'}); });
router.get('/news',      function (req, res) { res.render('news',      {title: 'mygamedev news',      page: 'news'}); });
router.get('/directory', function (req, res) { res.render('directory', {title: 'mygamedev directory', page: 'directory'}); });
router.get('/faq',       function (req, res) { res.render('faq',       {title: 'mygamedev faq',       page: 'faq'}); });

module.exports = router;
