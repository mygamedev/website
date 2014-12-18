(function () {
  'use strict';

  function hideall() {
    $('#gamedev').hide();
    $('#gameids').hide();
    $('#stdnprt').hide();
    $('#general').hide();
  }

  hideall();
  $('#gamedev').show();

  $('#gamedevb').on('click', function () { hideall(); $('#gamedev').show(); });
  $('#gameidsb').on('click', function () { hideall(); $('#gameids').show(); });
  $('#stdnprtb').on('click', function () { hideall(); $('#stdnprt').show(); });
  $('#generalb').on('click', function () { hideall(); $('#general').show(); });

}());