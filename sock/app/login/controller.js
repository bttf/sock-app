import Ember from 'ember';
import ENV from 'sock/config/environment';

var $ = Ember.$;

export default Ember.Controller.extend({
  passwordMismatch: false,

  actions: {
    signUp: function(email, password, confirm) {
      if (password === confirm) {
        this.set('passwordMismatch', false);
        this.send('createUserRequest', email, password);
      } else {
        this.set('passwordMismatch', true);
      }
    },

    createUserRequest: function(email, password) {
      var self = this;
      $.ajax({
        url: ENV.footAPI + '/users',
        type: 'POST',
        data: {
          email: email,
          password: password
        }
      }).done(function () {
        self.send('login', email, password);
      }).fail(function (err) {
        console.error(err);
      });
    }
  }
});
