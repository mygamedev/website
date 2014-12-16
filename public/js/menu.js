(function ($) {
  "use strict";

  // Menu Click
  var $body       = $('body');
  var menuClicked = false;

  var $menu = $('.menu-ezel, .menu-trigger');
  $menu.click(function () {
    menuClicked = true;
    $body.toggleClass('menu-active');
    setTimeout(function() { menuClicked = false; }, 300);
  });

  var $content = $('#content');
  $content.click(function () {
    if (!menuClicked && $body.hasClass('menu-active')) {
      $body.toggleClass('menu-active');
    }
  });

}(window.jQuery));