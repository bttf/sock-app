import DS from 'ember-data';
import ENV from 'sock/config/environment';

export default DS.RESTAdapter.extend({
  host: ENV.footAPI
});
