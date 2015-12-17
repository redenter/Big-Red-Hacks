/*
    The main entry point for the client side of the app
 */

// Create the main app object
this.App = {};

// Create the needed collections on the client side
this.Retailer = new Meteor.Collection("retailers");
this.Branch = new Meteor.Collection("branches");
this.Coupons = new Meteor.Collection("coupons");

// Subscribe to the publishes in server/collections

Meteor.subscribe("retailers");
Meteor.subscribe("branches");
Meteor.subscribe("coupons");


// Method to get the current user's email that won't ever throw an undefined error!

Meteor.users.getActiveEmail = function() {
  var email;
  email = "";
  if (Meteor.userId() && Meteor.user() && Meteor.user().emails && Meteor.user().emails[0] && Meteor.user().emails[0].address) {
    email = Meteor.user().emails[0].address;
  }
  return email;
};


// Start the app

Meteor.startup(function() {
  $(function() {
    App.routes = new Routes();
  });
});

