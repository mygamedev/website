(function ($, lodash) {
  'use strict';




  $.getJSON('/data/directory.json')
    .done(function (list) {

      var $list = $('#list');
      var entry;
      lodash
        .each(list, function (item) {
          entry = createEntry(item);
          $list.append(entry);
        });

    })
    .fail(function () {
    })
    .always(function () {
    });



  var createEntry = (function () {

    function escapeRegExp(string) {
      return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceAll(string, find, replace) {
      return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    function url(url, urlname) {
      return '<div class="row url">' +
               '<a href="http://' + url +'">' + (urlname ? urlname : url) +'</a>' +
             '</div>'
    }

    function spacing() {
      return '<div class="row"><div class="spacer-10"></div></div>';
    }

    function address(addressLines) {

      if (addressLines) { addressLines = addressLines.split(','); }
      if (!addressLines || addressLines.length < 1) { return '<div class="row address"></div>'; }

      var content = "";
      addressLines
        .forEach(function (addressLine) {
          content += '<div class="row addressentry"><span>' + addressLine + '</span></div>'
        });

      return '<div class="row address">' + content + '</div>';
    }

    function telephones(telephones) {

      if (!telephones || telephones.length < 1) { return '<div class="row telephone text-left"></div>'; }

      var content = "";
      telephones
        .forEach(function (telephone) {
          telephone = replaceAll(telephone, '+6', '');
          telephone = replaceAll(telephone, '-',  '');
          telephone = replaceAll(telephone, ' ',  '');
          content += '<div class="row telephoneentry"><span>' + telephone + '</span></div>'
        });

      return '<div class="row telephone text-left">' +
               '<div class="col-xs-1"><span class="icon">T</span></div>' +
               '<div class="col-xs-8">' + content + '</div>' +
             '</div>';
    }

    function emails(emails) {

      if (!emails || emails.length < 1) { return '<div class="row email"></div>'; }

      var content = "";
      emails
        .forEach(function (email) {
          content += '<div class="row emailentry"><span>' + email + '</span></div>'
        });

      return '<div class="row email">' +
               '<div class="col-xs-1"><span class="icon">E</span></div>' +
               '<div class="col-xs-8">' + content +  '</div>' +
             '</div>'
    }

    return function (datum) {
      return '<div class="col-xs-12 col-sm-4 col-md-3 listing">' +
               '<div class="row title">' +
                 '<p>' + datum.title + '</p>' +
               '</div>' +
               '<div class="row desc">' +
                 url(datum.url, datum.urlname) +
                 spacing() +
                 address(datum.address) +
                 spacing() +
                 telephones(datum.telephone) +
                 emails(datum.email) +
               '</div>' +
             '</div>';
    };

  }());

}($, _));
