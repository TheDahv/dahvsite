(function ($) {
  // http://austinpray.com/blog/zepto-js-smooth-vertical-scrolling/
  var smoothScroll = function (el, to, duration) {
    if (duration < 0) {
      return;
    };

    var difference = to - $(window).scrollTop();
    var perTick = difference / duration * 10;
    this.scrollToTimerCache = setTimeout(function() {
        if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            smoothScroll(el, to, duration - 10);
        }
    }.bind(this), 10);
  };

  $(function () {
    $('nav a[href="#about"]').click(function (evt) {
      smoothScroll($('html, body'), document.getElementById('about').offsetTop, 500);

      evt.preventDefault();
      evt.stopPropagation();
      return false;
    });
  });

})(window.Zepto);
