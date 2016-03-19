import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  fixBrokenFavicon: Ember.on('didInsertElement', function() {
    var imgSelector = '#' + this.get('elementId') + ' img';
    $(imgSelector).error(function() {
      $(this).attr('src', '/sock.ico');
    });
  }),

  actions: {
    delete: function(bookmark) {
      this.sendAction('delete', bookmark);
    }
  }
});
