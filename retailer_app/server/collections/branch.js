/*
    The cars collection
 */

// Declare the collection
var Branch = new Meteor.Collection("branches");

// Publish the collection to the client
Meteor.publish("branches", function() {
  return Branch.find();
});

// Set permissions on this collection
Branch.deny({
  remove: function(userId, doc) {
    return false;
  }
});
Branch.allow({
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
