/*
    The cars collection
 */

// Declare the collection
var Coupons = new Meteor.Collection("coupons");

// Publish the collection to the client
Meteor.publish("coupons", function(retailerId,branchId) {
  return Coupons.find({retailerId:retailerId, branchId:branchId});
});

// Set permissions on this collection
Coupons.allow({
  
insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  }

});

// What to do when the server first starts up
Meteor.startup(function() {

  // Fill the collection with some initial data if it's empty
  if (Coupons.find().count() === 0) {
    
  }
});
