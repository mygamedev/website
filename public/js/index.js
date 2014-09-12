if (console) {
  var doge = location.origin + '/img/doge.png';
  console.meme("wow", "much curiosity", doge, 200, 150);
}

(function ($) {
  'use strict';
  function d() { $('.dirigible').animate({top: '-55px'}, 1000, u); }
  function u()   { $('.dirigible').animate({top: '-65px'}, 1500, d); }
  d();
}($));