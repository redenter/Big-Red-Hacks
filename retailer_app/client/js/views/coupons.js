/*
 * View logic for the Cars page
 */

Meteor.startup(function() {

  Session.setDefault('offerName', '');
  Session.setDefault('custLimit', '');
  Session.setDefault('offerDesc', '');
  Session.setDefault('custType', '');

  Template.coupons.events = {
    'click .submitButton': function(event, template) {
      event.preventDefault();
      offerName = Session.get('offerName');
      custLimit = Session.get('custLimit');
      offerDesc = Session.get('offerDesc');
      retailerID = Session.get('retailerIdToFetchDeals');
      branchID = Session.get('retailerBranch');
      maxDiscount = Session.get('maxDiscount');
      basePrice = Session.get('basePrice');
      currentPrice = basePrice;
      currentBuyIn = 0;
      active = true;

      Coupons.insert({
        offerName: offerName,
        offerDesc: offerDesc,
        custLimit: custLimit,
        retailerID: retailerID,
        branchID: branchID,
        basePrice: basePrice,
        maxDiscount:maxDiscount,
        currentPrice:currentPrice,
        currentBuyIn:currentBuyIn,
        active:active
      });
      $(".right-modal").fadeOut("fast");
    },

    'input .offerName': function(event, template) {
      Session.set('offerName', event.target.value);
    },

    'input .offerDesc': function(event, template) {
      Session.set('offerDesc', event.target.value);
    },

    'input .custLimit': function(event, template) {
      Session.set('custLimit', event.target.value);
    },

    'input .maxDiscount': function(event, template) {
      Session.set('maxDiscount', event.target.value);
    },
    'input .basePrice': function(event, template) {
      Session.set('basePrice', event.target.value);
    },
  };

  Template.coupons.helpers({
    couponPending: function() {
      return {
        offerName: Session.get('offerName'),
        offerDesc: Session.get('offerDesc'),
        custLimit: Session.get('custLimit'),
        offerDesc: Session.get('offerDesc'),
        maxDiscount: Session.get('maxDiscount'),
        basePrice: Session.get('basePrice')
      }
    }
  });
});
