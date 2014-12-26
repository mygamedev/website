(function ($) {
  'use strict';
  function d() { $('.dirigible').animate({top: '-55px'}, 1000, u); }
  function u()   { $('.dirigible').animate({top: '-65px'}, 1500, d); }
  d();
}($));