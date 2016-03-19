import DS from 'ember-data';

var attr = DS.attr;
var belongsTo = DS.belongsTo;

export default DS.Model.extend({
  url: attr('string'),
  title: attr('string'),
  desc: attr('string'),
  imgUrl: attr('string'),
  dateCreated: attr('date', { defaultValue: function() { return new Date(); } }),
  user: belongsTo('user', { async: true })
});
