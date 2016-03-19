import Ember from 'ember';
import ENV from 'sock/config/environment';

var $ = Ember.$;

export default Ember.Controller.extend({
  bmIsSaving: false,
  doingASearch: false,

  actions: {
    saveBm: function(bookmark) {
      var self = this;
      self.store.find('user', self.get('session.secure.id')).then(function(user) {
        self.set('bmIsSaving', true);
        bookmark.set('user', user);
        bookmark.save().then(function (bookmark) {
          self.send('flushBm');
          self.set('bmIsSaving', false);
          self.get('bookmarks').unshiftObject(bookmark);
        });
      });
    },

    search: function(term) {
      this.set('doingASearch', true);
      $.ajax({
        url: ENV.footAPI + '/search/' + term,
        type: 'GET',
      }).then((response) => {
        if (this.get('searchResults.length') !== response.bookmarks.length || !this.get('searchResults.length')) {
          this.get('searchResults').clear();
          response.bookmarks.forEach((bookmark) => {
            this.get('searchResults').pushObject(bookmark);
          });
        }
      });
    },

    resetBms() {
      this.get('searchResults').clear();
      this.set('doingASearch', false);
    },

    deleteBm: function(bookmark) {
      bookmark.destroyRecord();
    },

    flushBm: function() {
      this.set('newBookmark', this.store.createRecord('bookmark'));
    }
  }
});
