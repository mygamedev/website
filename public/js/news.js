(function ($, lodash, moment) {

  $(document).ready(function () {


    // "responsive" stage
    var $stage       = $('#stage'),
        $video       = $('#videoframe'),
        stage_height = $stage.height(),
        video_height = $video.height();

    $video.height($video.width() / 96 * 54);
    $stage.height(stage_height - (video_height - $video.height()));

    $(window).resize(function () {
      $video.height($video.width() / 96 * 54);
      $stage.height(stage_height - (video_height - $video.height()));
    });

    $('.small-video').fitVids();

    $.getJSON('/data/news.json')
      .done(function (news) {

        news = lodash
                 .sortBy(news, function (e) {
                   return -moment(e.date).valueOf();
                 });
      });

  });

}($, _, moment));