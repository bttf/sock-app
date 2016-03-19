import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from 'sock/config/environment';

var $ = Ember.$;

export default Base.extend({
  restore(data) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      $.ajax({
        url: ENV.footAPI + '/auth/validate',
        type: 'POST',
        headers: {
          'auth-token': data.token
        }
      }).done(function () {
        resolve(data);
      }).fail(function (xhr, status, err) {
        reject(err);
      });
    });
  },

  authenticate(options) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      $.ajax({
        url: ENV.footAPI + '/auth',
        type: 'POST',
        data: {
          email: options.email,
          password: options.password
        }
      }).done(function (response) {
        response.id = response._id;
        resolve(response);
      }).fail(function (xhr, status, err) {
        reject(err);
      });
    });
  },

  invalidate(data) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      $.ajax({
        url: ENV.footAPI + '/auth/invalidate',
        type: 'POST',
        headers: {
          'auth-token': data.token
        }
      }).done(function() {
        resolve();
      }).fail(function(xhr, status, err) {
        reject(err);
      });
    });
  }
});
