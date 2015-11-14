/*
    The cars collection
 */

// Declare the collection


 

// var Offers = new Mongo.Collection("coupons", {
//     _preventAutopublish: true,
//     connection: DDP.connect("http://127.0.0.1:3000")
// });
var Offers = new Meteor.Collection("coupons");

// Publish the collection to the client
Meteor.publish("coupons", function() {
  return Offers.find({active:true});
});

// Set permissions on this collection

Offers.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  }
});


