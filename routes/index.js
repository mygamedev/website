'use strict';

var express = require('express'),
    router  = express.Router();

router.get('/',          function (req, res) { res.render('page_index',     {title: 'mygamedev',           page: 'index'});     });
router.get('/about',     function (req, res) { res.render('page_about',     {title: 'about mygamedev',     page: 'about'});     });
router.get('/news',      function (req, res) { res.render('page_news',      {title: 'mygamedev news',      page: 'news'});      });
router.get('/directory', function (req, res) { res.render('page_directory', {title: 'mygamedev directory', page: 'directory'}); });
router.get('/faq',       function (req, res) { res.render('page_faq',       {title: 'mygamedev faq',       page: 'faq'});       });
router.get('*',          function (req, res) { res.redirect('/');                                                               });

module.exports = router;
