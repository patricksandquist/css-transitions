$.Tabs = function (el) {
  this.$el = $(el);
  this.$tabContent = $(this.$el.attr('data-content-tabs'));
  this.$activeTabContent = $(this.$tabContent.find('.active'));
  this.$el.on('click', 'li', this.clickTab.bind(this));
 };

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

$.Tabs.prototype.clickTab = function(e) {
  this.$activeTabContent.removeClass('active');
  this.$el.find('.active').removeClass('active');
  $(e.currentTarget).find('a').addClass('active');
  this.$activeTabContent.addClass('transitioning');

  this.$activeTabContent.one('transitionend', function() {
    this.$activeTabContent.removeClass('transitioning');
    var id = $(e.currentTarget).find('a').attr('href');
    this.$tabContent.find(id).addClass('active transitioning');
    this.$activeTabContent = $(this.$tabContent.find('.active'));
    setTimeout(function() {
      this.$tabContent.find(id).removeClass('transitioning');
    }.bind(this), 0);
  }.bind(this));
};
