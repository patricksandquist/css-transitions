$.fn.carousel = function() {
  return this.each(function () {
    new $.Carousel(this);
  });
};

$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  $('ul li:first-child').addClass("active");
  this.$el.on('click', 'button.slide-right', this.slideRight.bind(this));
  this.$el.on('click', 'button.slide-left', this.slideLeft.bind(this));
  this.transitioning = false;
};

$.Carousel.prototype.slideLeft = function () {
  if (this.transitioning === true) {
    return;
  }
  this.transitioning = true;
  var $oldActive = this.$el.find('.items').children().eq(this.activeIdx);
  this.activeIdx = (this.activeIdx + 1) %
                   (this.$el.find('.items').children().length);
  var $newActive = this.$el.find('.items').children().eq(this.activeIdx);

  $newActive.addClass('active right');
  setTimeout(function(){
    $newActive.removeClass("right");
    $oldActive.addClass('left');
    $oldActive.one('transitionend', function() {
      $oldActive.removeClass('active left');
      this.transitioning = false;
    }.bind(this));
  }.bind(this), 0);
};

$.Carousel.prototype.slideRight = function () {
  if (this.transitioning === true) {
    return;
  }
  this.transitioning = true;
  var $oldActive = this.$el.find('.items').children().eq(this.activeIdx);
  this.activeIdx = (this.activeIdx + (this.$el.find('.items').children().length - 1)) %
                   (this.$el.find('.items').children().length);
  var $newActive = this.$el.find('.items').children().eq(this.activeIdx);

  $newActive.addClass('active left');
  setTimeout(function(){
    $newActive.removeClass('left');
    $oldActive.addClass('right');
    $oldActive.one('transitionend', function() {
      $oldActive.removeClass('active right');
      this.transitioning = false;
    }.bind(this));
  }.bind(this), 0);
};
