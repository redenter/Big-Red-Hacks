
Meteor.startup(function() {
  Session.setDefault('retailerName', '');
  Session.setDefault('retailerDescription', '');

  Template.retailSignup.events({
    'submit .form-retailerSignup': function(event, template) {
      var retailerName, retailerDescription;
      event.preventDefault();
      retailerName = Session.get('retailerName');
      retailerDescription = Session.get('retailerDescription');
      Retailer.insert({
        userid: Meteor.userId(),
        name: retailerName,
        desc: retailerDescription
      });
    },
    'input .retailName': function(event, template) {
      Session.set('retailerName', event.target.value);
    },
    'input .retailDescription': function(event, template) {
      Session.set('retailerDescription', event.target.value);
  },
    'click .retailerFetch': function(event, template){
      console.log(getLoggedInUserRetailId);
    }
});

  var getLoggedInUserRetailId = function() {
    var loggedInID = Meteor.userId();
    var retailerInfo = Retailer.findOne({
        userid: Meteor.userId()});

    return retailerInfo.userid;
  }
   
  Template.retailSignup.helpers({
    retailers: function() {
      return Retailer.find().fetch().reverse();
    },
    retailer:function(){
      return Retailer.findOne({
        _id: Session.get('retailerID')
      });
    },
    loggedInRetailer: function(){
      return Retailer.findOne({
        userid: Meteor.userId()
      });
    },
    retailerNamePending: function() {
      return Session.get('retailerName');
    },
    retailerDescPending: function() {
      return Session.get('retailerDescription');
    },
    userName: function() {
      if (Meteor.user() != null)
        return Meteor.user().profile.name;
    },
    loggedIn: function() {
      return Meteor.userId() != null;
    }
  });
});
