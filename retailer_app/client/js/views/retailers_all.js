/*
 * Cars Collection View
 */

Meteor.startup(function() {

  Template.retailersAll.helpers({
      retailers: function() {
        return Retailer.find();
      }
  });
});
