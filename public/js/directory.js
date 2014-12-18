(function () {
  'use strict';

  function hideall() {
    $('#gamedev').hide();
    $('#multibiz').hide();
    $('#artoutsource').hide();
    $('#gamepublishers').hide();
    $('#institutions').hide();
    $('#incubator').hide();
  }

  hideall();
  $('#gamedev').show();

  $('#gamedevb').on('click',        function () { hideall(); $('#gamedev').show(); });
  $('#multibizb').on('click',       function () { hideall(); $('#multibiz').show(); });
  $('#artoutsourceb').on('click',   function () { hideall(); $('#artoutsource').show(); });
  $('#gamepublishersb').on('click', function () { hideall(); $('#gamepublishers').show(); });
  $('#institutionsb').on('click',   function () { hideall(); $('#institutions').show(); });
  $('#incubatorb').on('click',      function () { hideall(); $('#incubator').show(); });

}());
