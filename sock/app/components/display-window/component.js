import Ember from 'ember';
import ENV from 'sock/config/environment';

var $ = Ember.$;

export default Ember.Component.extend({
  isFetching: false,

  processUrl: Ember.observer('url', function() {
    var self = this;
    var url = this.get('url');
    $.ajax({
      beforeSend: function() { self.set('isFetching', true); },
      method: 'POST',
      url: ENV.footAPI,
      data: {
        url: url
      },
      timeout: 10 * 1000 
    }).done(function(data) {
      self.set('isFetching', false);
      self.set('bm.title', data.title);
      self.set('bm.desc', data.desc);
      self.set('bm.imgUrl', data.imgUrl);
      self.sendAction('onFetched', self.get('bm'));
    });
  }),
});

