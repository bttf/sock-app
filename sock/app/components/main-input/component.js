import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main-input'],
  lookupTimeouts: [],

  keyUp: function(e) {
    if (e.keyCode === 13) {
      if (isUrl(this.get('bm.url'))) {
        this.sendAction('saveBm', this.get('bm'));
      } else {
        this.sendAction('search', this.get('bm.url'));
      }
    } else {
      if (!isUrl(this.get('bm.url'))) {
        var len = this.get('bm.url.length');
        if (len > 2) {
          this.sendAction('search', this.get('bm.url'));
        } else if (!len) {
          this.sendAction('resetBms');
        }
      }
    }
  }
});

function isUrl(url) {
  if (url.indexOf('http') === 0) {
    return true;
  }
  return false;
}
