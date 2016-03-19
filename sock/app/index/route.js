import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return Ember.RSVP.hash({
      newBookmark: this.store.createRecord('bookmark'),
      allBookmarks: this.store.find('bookmark'),
      searchResults: Ember.A([]),
    });
  },

  setupController: function(controller, model) {
    controller.setProperties(model);
    controller.set('bookmarks', Ember.computed('doingASearch', () => {
      if (controller.get('doingASearch')) {
        return model.searchResults;
      } else {
        return model.allBookmarks;
      }
    }));
  },
});
