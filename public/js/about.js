(function ($) {
  'use strict';

  $('.partner').each(function () {

    var $this = $(this);
        $this.css('opacity', '0.2')
             .on('mouseenter', function () { $this.css('opacity', '0.9'); })
             .on('mouseleave', function () { $this.css('opacity', '0.2'); })

  });





}($));