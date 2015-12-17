
Meteor.startup(function() {
  Session.setDefault('branchName', '');
  Session.setDefault('branchDescription', '');
  Session.setDefault('branchLocation', '');
  });

  Template.addBranch.events({
    'submit .form-addBranch': function(event, template) {
      var branchName, branchDescription, branchLocation;
      event.preventDefault();
      branchName = Session.get('branchName');
      branchDescription = Session.get('branchDescription');
      branchLocation = Session.get('branchLocation');
      retailerId = getLoggedInUserRetailId();
      Branch.insert({
        retailerId: retailerId,
        name: branchName,
        desc: branchDescription,
        loc: branchLocation,
      });
    },


    'input .branchName': function(event, template) {
      Session.set('branchName', event.target.value);
    },
    'input .branchDescription': function(event, template) {
      Session.set('branchDescription', event.target.value);
  },
    'input .branchLocation': function(event, template){
      Session.set('branchLocation', event.target.value);
    }
});

  var getLoggedInUserRetailId = function() {
    var loggedInID = Meteor.userId();
    var retailerInfo = Retailer.findOne({
        userid: Meteor.userId()});
    console.log(retailerInfo.userid);
    return retailerInfo.userid;
  }


  Template.allBranch.helpers({
    branches: function() {
      return Branch.find().fetch().reverse();
    },
    retailerBranches:function(){
      return Branch.find({
        retailerId:getLoggedInUserRetailId()
      });
    }
  });

  Template.addBranch.helpers({
    branches: function() {
      return Branch.find().fetch().reverse();
    },
    retailerBranches:function(){
      return Branch.find({
        retailerId:getLoggedInUserRetailId()
      });
    },
    loggedInRetailer: function(){
      return Retailer.findOne({
        userid: Meteor.userId()
      });
    },
    branchNamePending: function() {
      return Session.get('branchName');
    },
    branchDescPending: function() {
      return Session.get('branchDescription');
    },
    branchLocationPending: function(){
      return Session.get('branchLoction')
    },
    userName: function() {
      if (Meteor.user() != null)
        return Meteor.user().profile.name;
    },
    loggedIn: function() {
      return Meteor.userId() != null;
    }
  });

