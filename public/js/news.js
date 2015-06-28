(function ($, lodash, moment) {

  $(document)
    .ready(function () {

      var $book2014    = $('#book-2014');
      var $book2013    = $('#book-2013');
      var $bookearlier = $('#book-earlier');

      $book2014.hide();
      $book2013.hide();
      $bookearlier.hide();

      /**
       * News
       */
      $.getJSON('data/news.json')
        .done(function (news) {

          function createBoardItem(newsItem, color) {

            var title = newsItem.title;
                title = title.length > 27 ? title.substr(0, 27) + ' ... ' : title;

            var date = moment(newsItem.date).format('DD MMM YYYY');

            return '<div class="row" style="max-width: 305px; background-color: ' + color + '; padding-top: 15px; padding-bottom: 15px;">' +
                     '<div class="col-xs-7" style="color: #724F3D; font-family: \'Avenir\', sans-serif; margin-left: 15px;">' +
                       '<div style="font-size: 14px; font-weight: 800;">' + title + '</div>' +
                       '<div style="font-size: 12px;">' + date + '</div>' +
                     '</div>' +
                     '<div class="col-xs-4 text-center">' +
                       '<a style="text-decoration: none;" href="' + newsItem.url + '">'  +
                         '<div style="background-color: #F1826B; color: white; padding: 5px; font-family: \'Oswald\', sans-serif; margin-top: 30%;">READ</div>' +
                       '</a>' +
                     '</div>' +
                   '</div>'
          }

          news = lodash
                   .sortBy(news, function (e) {
                     return -moment(e.date).valueOf();
                   });

          /**
           * Main Item
           */
          news.shift();

          /**
           * Board Items
           */
          var board = [];
              board.push(news.shift());
              board.push(news.shift());
              board.push(news.shift());

          var $boardItems = $('#boarditems');
          board
            .forEach(function (e, index) {
              $boardItems
                .append(createBoardItem(e, ((index % 2) ? '#E7D6B6' : '#F0E2C9')));
            });

          var $mobileBoardItems = $('#mobileboarditems');
          news
            .forEach(function (e, index) {
              $mobileBoardItems
                .append(createBoardItem(e, ((index % 2) ? '#E7D6B6' : '#F0E2C9')));
            });

          /**
           * Archive Section
           */
          $bookearlier.show();

          var $earlier_carousel = $('#earlier-carousel');
              $earlier_carousel.carousel({interval: 10000});

          $('#book-earlier-prev-button').on('click', function () { $earlier_carousel.carousel('prev'); });
          $('#book-earlier-next-button').on('click', function () { $earlier_carousel.carousel('next'); });
          $('#book-earlier-one-button').on( 'click', function () { $earlier_carousel.carousel(0);      });
          $('#book-earlier-two-button').on( 'click', function () { $earlier_carousel.carousel(1);      });

          $('#book-earlier-button')
            .on('click', function () {
              $book2014.hide();
              $book2013.hide();
              $bookearlier.show();
            });

          $('#book-2013-button')
            .on('click', function () {
              $book2014.hide();
              $book2013.show();
              $bookearlier.hide();
            });

          $('#book-2014-button')
            .on('click', function () {
              $book2014.show();
              $book2013.hide();
              $bookearlier.hide();
            });

        });


      /**
       * Events
       */

      $.getJSON('data/events.json')
        .done(function (events) {

          function createItem(e) {

            var range    = e.range    || '1-2';
            var location = e.location ||    '';
            var title    = e.title    ||    '';
            var url      = e.url      ||   '#';

            //if (title.length > 12 ){
            //  title = title.substr(0,12) + '...';
            //}

            return '<div class="row calendar-item">' +
                     '<div class="col-sm-2 col-xs-3">' +
                       '<p class="calendar-range">'+ range +'</p>' +
                     '</div>' +
                     '<div class="col-sm-9 col-xs-7">' +
                       '<div class="row"><p class="calendar-location">' + location + '</p></div>' +
                       '<div class="row"><p class="calendar-title">' + title + '</p></div>' +
                     '</div>' +
                     '<div class="col-xs-1">' +
                       '<a href="' +  url +'"><img src="/img/news/calendar_arrow.svg" class="calendar-arrow"></a>' +
                     '</div>' +
                   '</div>';
          }

          function createPage(group) {
            var classes = 'item';
            if (group.month === moment().format('MMMM').toUpperCase()) {
              classes += ' active';
              $('.calendar-month').text(group.month);
            }
            var items   = '';
            group
              .items
              .forEach(function (item) {
                items += createItem(item);
              });

            return '<div class="' + classes + '">' +
                     '<div class="hidden month">' + group.month + '</div>' +
                     '<div class="hidden year">' + group.year + '</div>' +
                     items +
                   '</div>';
          }


          events = lodash
                     .chain(events)
                     .map(function (event) {

                       var start = moment(event.startdate);
                       var end   = moment(event.enddate);

                       event.group      = start.year() + (start.month() < 9 ? "0" : "") + (start.month() + 1);
                       event.startdate  = start.toDate();
                       event.startday   = start.day();
                       event.startmonth = start.format('MMM');
                       event.startyear  = start.year();
                       event.enddate    = end.toDate();
                       event.endday     = end.day();
                       event.endmonth   = start.format('MMM');
                       event.range      = event.startday + '-' + event.endday;

                       return event;
                     })
                     .sortBy('startdate')
                     .value();

          var groups = {};
          lodash
            .each(events, function (event) {
              var group = event.group;
              if (!groups[group]) { groups[group] = []; }
              groups[group].push(event);
            });


          groups = lodash
                     .map(groups, function (group, key) {
                       var m = moment(key, 'YYYYMM');
                       return {year: m.year(), month: m.format('MMMM').toUpperCase(), items: group};
                     });

          var $eventcarousel = $('#event-carousel');
          lodash
            .each(groups, function (group) {
              $eventcarousel.append(createPage(group));
            });


          $('#event-carousel').carousel();

          $eventcarousel
            .on('slid.bs.carousel', function () {

              var month = $eventcarousel.find('.item.active > .month').text();
              var year  = $eventcarousel.find('.item.active > .year').text();

               $('.calendar-year').text(year);
              $('.calendar-month').text(month);

              console.log(month, year);
            });

          $eventcarousel.carousel('pause');
          $('.calendar-arrow-left') .on('click', function () { $eventcarousel.carousel('prev'); });
          $('.calendar-arrow-right').on('click', function () { $eventcarousel.carousel('next'); });
        });


      /**
       * Videos
       */
      setTimeout(function () {
          $.getJSON('data/videos.json')
            .done(function (videos) {

              function createMain(options) {
                return '<iframe id="videoframe" style="border-left: 7px solid #333333; border-right:7px solid #333333; border-top: none; border-bottom: none;" ' +
                         'src="' + options.url + '"' +
                         'width="100%" '             +
                         'height="510">'             +
                       '</iframe>';

              }

              function createPage(videos) {

                var content = lodash
                                .chain(videos)
                                .map(function (video) { return createMini(video); })
                                .reduce( function (memo, video) { return memo + video; }, "")
                                .value();

                return '<div class="item row text-center">' + content + '</div>';
              }

              function createMini(options) {
                if (options.title.length > 27) {
                  options.title = options.title.substr(0, 27) + " ... ";
                }

                var titleStyle = 'padding-left: 12px; color: #EE6361; font-family: "Avenir", sans-serif; font-size: 16px; font-weight: 800';
                var dateStyle  = 'padding-left: 12px; color: #00878C; font-family: "Avenir", sans-serif; font-size: 13px;';
                var date       = moment(options.date).fromNow();

                return '<div class="col-sm-4">' +
                         '<div class="row">' +
                           '<iframe style="border: none;" src="' + options.url + '" width="253" height="145"></iframe>' +
                           '<div class="spacer-20"></div>' +
                           '<div class="row text-left">' +
                             '<a style="' + titleStyle + '" href="' + options.url + '">' + options.title + '</a>' +
                           '</div>' +
                           '<div class="row text-left">' +
                             '<p style="' + dateStyle + '" >' + date + '</p>' +
                           '</div>' +
                         '</div>' +
                       '</div>';
              }

              videos = lodash.sortBy(videos, function (e) { return -moment(e.date).valueOf(); });


              var random = lodash.random(0, videos.length - 1);
              var main   = lodash.pullAt(videos, [random]).pop();

              /**
               * Video Carousel
               */

              var some, someLength, $videocarousel = $('#video-carousel');
              while (videos.length > 0) {
                some       = lodash.take(videos, 3);
                someLength = some.length;
                $videocarousel.append(createPage(some));
                for (var i = 0; i < someLength; i++) {
                  videos.shift();
                }
              }

              $videocarousel.carousel({ interval: 10000 });

              $('#video-prev-button') .on('click', function () { $videocarousel.carousel('prev'); });
              $('#video-next-button') .on('click', function () { $videocarousel.carousel('next'); });
              $('#video-one-button')  .on('click', function () { $videocarousel.carousel(0);      });
              $('#video-two-button')  .on('click', function () { $videocarousel.carousel(1);      });
              $('#video-three-button').on('click', function () { $videocarousel.carousel(2);      });

              /**
               * Stage Stuffs
               */
              $('#stagevideo')
                .append(createMain(main));

              var $stage       = $('#stage'),
                  $video       = $('#videoframe'),
                  stage_height = $stage.height(),
                  video_height = $video.height();

              $video.height($video.width() / 96 * 54);
              $stage.height(stage_height - (video_height - $video.height()));

              $(window)
                .resize(function () {
                  $video.height($video.width() / 96 * 54);
                  $stage.height(stage_height - (video_height - $video.height()));
                });


            });
        }
        , 1000);


  });

}($, _, moment));