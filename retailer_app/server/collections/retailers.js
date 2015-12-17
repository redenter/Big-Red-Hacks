/*
    The cars collection
 */

// Declare the collection
var Retailers = new Meteor.Collection("retailers");

// Publish the collection to the client
Meteor.publish("retailers", function() {
  return Retailers.find();
});

// Set permissions on this collection
Retailers.deny({
  remove: function(userId, doc) {
    return false;
  }
});
Retailers.allow({
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
  
});
