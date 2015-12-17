Meteor.startup(function() {
  Session.setDefault('branchName', '');
  Session.setDefault('branchDescription', '');
  Session.setDefault('branchLocation', '');
});
  Template.allBranch.events({
   'click .addBranch': function(event, template) {
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
      $(".modal").fadeOut("fast");
    },
    'click .left-branches .btn-add': function(event, template){
      $('.modal').fadeToggle('fast');
      //alert("hi");
    },
    'click .right-offers .btn-add': function(event, template){
      $('.right-modal').fadeToggle('fast');
      //alert("hi");
    },
    'click .branch': function(e,template){
      $(".branch").removeClass("branch-current");
      $(e.target).closest(".branch").addClass('branch-current');
      var retailerID = $(e.target).attr('retailerid');
      var branchID = $(e.target).attr('branchid');
      Session.set('retailerIdToFetchDeals', retailerID);
      Session.set('retailerBranch', branchID);
      
    },
    'click .modal' : function(e, template){
    if ($(e.target).parents('form').length>0 || $(e.target).is('form')){
      e.preventDefault();
      return;
    }
    $('.modal').fadeToggle('fast');
    },

    'click .right-modal' : function(e, template){
    if ($(e.target).parents('form').length>0 || $(e.target).is('form')){
      e.preventDefault();
      return;
    }
    $('.right-modal').fadeToggle('fast');
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
    },
    couponslist:function(){
      clist = Coupons.find({$and :[
        {retailerID:Session.get('retailerIdToFetchDeals')},
        {branchID:Session.get('retailerBranch')}]});
      console.log(clist.count());
      return clist;
      
    },
    isEmptyCouponsList:function(){
      cl= Coupons.find([{retailerID:Session.get('retailerIdToFetchDeals')}, {branchID: Session.get('retailerBranch')}]); 
      if(cl.length > 0)
        return true;
      else
        return false;
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

