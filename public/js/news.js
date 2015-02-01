(function ($, lodash, moment) {

  $(document)
    .ready(function () {

      /**
       * News
       */
      $.getJSON('/data/news.json')
        .done(function (news) {
          news = lodash
                   .sortBy(news, function (e) {
                     return -moment(e.date).valueOf();
                   });
        });

      /**
       * Videos
       */

      function createMain(options) {

        return '<iframe id="videoframe" style="border-left: 7px solid #333333; border-right:7px solid #333333; border-top: none; border-bottom: none;" ' +
                       'src="' + options.url + '"' +
                       'width="100%" '             +
                       'height="510">'             +
               '</iframe>';

      }

      function createPage(videos) {

        videos = lodash.map(videos, function (videoOptions) {
                                      return createMini(videoOptions);
                                    });

        return '<div class="item">' +
                 '<div class="row text-center">' +
                    lodash.reduce(videos, function (memo, video) {
                      return memo + video;
                    }, "") +
                 '</div>' +
               '</div>'
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

      $.getJSON('/data/videos.json')
        .done(function (videos) {

          videos = lodash.sortBy(videos, function (e) {
                       return -moment(e.date).valueOf();
                     });


          var random = lodash.random(0, videos.length - 1);
          var main   = lodash.pullAt(videos, [random]).pop();

          /**
           * Video Carousel
           */
          var $videocarousel = $('#video-carousel');
          while (videos.length > 0) {
            var some = lodash.take(videos, 3);
            $videocarousel.append(createPage(some));
            for (var i = 0; i < some.length; i++) {
              videos.shift();
            }
          }
          $videocarousel.carousel({
            interval: 5000
          });

          $('#video-prev-button').on('click', function () { $videocarousel.carousel('prev'); });
          $('#video-next-button').on('click', function () { $videocarousel.carousel('next'); });

          $('#video-one-button')  .on('click', function () { $videocarousel.carousel(0); });
          $('#video-two-button')  .on('click', function () { $videocarousel.carousel(1); });
          $('#video-three-button').on('click', function () { $videocarousel.carousel(2); });

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

  });

}($, _, moment));