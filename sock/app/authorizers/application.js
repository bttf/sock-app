import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR) {
    jqXHR.setRequestHeader('auth-token', this.get('session.secure.token'));
  }
});
