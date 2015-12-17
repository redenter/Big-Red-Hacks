/*
 * Cars Collection View
 */

Meteor.startup(function() {

  Template.singleCoupon.helpers({
      coupons1: function() {
        return Coupons.find();
      }
  });
});
