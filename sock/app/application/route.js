import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    login: function(email, password) {
      this.get('session').authenticate('authenticator:foot', {
        email: email,
        password: password
      });
    },

    logout: function() {
      this.get('session').invalidate('authenticator:foot');
    }
  }
});
