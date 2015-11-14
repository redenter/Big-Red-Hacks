/*
 * Cars Collection View
 */

Meteor.startup(function() {

  Template.collectionOffers.helpers({
      offers: function() {
        return Offers.find();
      }
  });



  Template.modelOffer.events({
    'click .content':function(event, target){
      var r = confirm("Are you sure you want to claim this offer?");
      if (r == true) {
      //  console.log($o);
        (event.target).parentElement.getElementsByClassName('item-overlay')[0].style.display='block';
        var productCategory = guessProductCategoryBasedOnName(this.offerName);
        var gsf = groupSaleFactor(this.custLimit, this.basePrice, productCategory);
        var currDisP = getCurrentDiscountPercentage(parseInt(this.currentBuyIn), parseInt(this.maxDiscount), gsf, parseInt(this.custLimit));
        if(parseInt(this.currentBuyIn) == parseInt(this.custLimit)){
          Offers.update(this._id,{$set:{ active:false}});
        }

        var fixedDownPrice = ((1-(currDisP/100))*this.basePrice);
        Offers.update(this._id,{$set:{ currentBuyIn:parseInt(this.currentBuyIn)+1}});
        Offers.update(this._id,{$set:{ currentPrice: fixedDownPrice}});

      } 
      else {
        return;
      }
    }
  });
});


var productType = {garments:0, ornaments:1, cars:2, toys:0, services:0, accesories:0, furniture:1, books:0, electronics:1, sports:1, unidentified:0 };

function guessProductCategoryBasedOnName(offerName){
  if(name.search('jeans') > 0 || name.search('coat') > 0 || name.search('shirt')> 0 || name.search('blazer') > 0 || name.search('dress') > 0 || name.search('wear') > 0  || name.search('capree') > 0)
    return 'garments';
  else if(name.search('powder') > 0 || name.search('finger') > 0 || name.search('nail')> 0 || name.search('liner') > 0 || name.search('lip') > 0 || name.search('glasses') > 0  || name.search('shoes') > 0)
    return 'accesories';
  else if(name.search('ring') > 0 || name.search('necklace') > 0 || name.search('bangles')> 0 || name.search('chains') > 0 )
    return 'ornaments';
  else if(name.search('ford') > 0 || name.search('lamborgini') > 0 || name.search('ferarri')> 0 || name.search('kia') > 0 || name.search('hundai') > 0 || name.search('nissan') > 0  || name.search('maruti') > 0)
    return 'cars';
  else if(name.search('saloon') > 0 || name.search('spa') > 0 || name.search('food')> 0 || name.search('restraunt') > 0 || name.search('dinner') > 0 || name.search('brunch') > 0  || name.search('drinks') > 0)
    return 'services';
  else if(name.search('television') > 0 || name.search('phone') > 0 || name.search('mixer')> 0 || name.search('cooker') > 0 || name.search('camera') > 0 || name.search('netflix') > 0  || name.search('laptop') > 0)
    return 'electronics';
  else 
    return 'unidentified';
}
// 0- Low Cost 1- Moderate 2- Expensive
function determineCostType(basePrice, productCategory){
  productTypeDetermined = determineType(productCategory);
  if( productTypeDetermined == 0){
    if(basePrice < 100)
      return 0;
    else if(basePrice < 500)
      return 1;
    else 
      return 2;
  }
  else if(productTypeDetermined == 1){
    if(basePrice < 500)
      return 0;
    else if(basePrice < 1000)
      return 1;
    else 
      return 2;
  }
  else {
    if(basePrice < 1500)
      return 0;
    else if(basePrice < 5000)
      return 1;
    else 
      return 2;
  }
};
// 0- Fast Moving 1- Moderate 2- Slow Moving 
function determineType(productCategory){
  if(productType[productCategory])
    return productType[productCategory];
};
// 0- Low Requirement 1- Moderate 2- High Requirement
function determineScale(custLimit, basePrice, productCategory){
  costFactor = determineCostType(basePrice, productCategory)
  if(costFactor == 0){
    if(custLimit < 100)
      return 0;
    else if(custLimit < 200)
      return 1;
    else 
      return 2;
  }
  else if(costFactor == 1)
  {
    if(custLimit < 50)
      return 0;
    else if(custLimit < 80)
      return 1;
    else 
      return 2;
  }
  else 
  {
    if(custLimit < 20)
      return 0;
    else if(custLimit < 50)
      return 1;
    else 
      return 2;
  }
};
function groupSaleFactor(custLimit, basePrice, productCategory){
costFactor = determineCostType(basePrice, productCategory);
scaleFactor = determineScale(custLimit, basePrice, productCategory);
switch(costFactor){
  case 0: {
    switch (scaleFactor){
      case 0: return 2;
        break;
      case 1: return 1;
        break;
      case 2: return 1;
        break;
      }
  }
  case 1: {
    switch (scaleFactor){
      case 0: return 2;
        break;
      case 1: return 1;
        break;
      case 2: return 0;
        break;
      }
  }
  case 2: {
    switch (scaleFactor){
      case 0: return 1;
        break;
      case 1: return 0;
        break;
      case 2: return 0;
        break;
      }
  }
}
};
function getCurrentDiscountPercentage(currentBuyIn, maxDiscount, gsf, custLimit){
  var firstSectorBreak, secondSectorBreak;
  switch(gsf){
    case 0:
      firstSectorBreak = (custLimit*0.2);
      secondSectorBreak = (custLimit*0.7);
    case 1: 
      firstSectorBreak = (custLimit*0.4);
      secondSectorBreak = (custLimit*0.8);
    case 2: 
      firstSectorBreak = (custLimit*0.1);
      secondSectorBreak = (custLimit*0.4);
  }
var currentDiscount;
  if(currentBuyIn < firstSectorBreak ) 
    currentDiscount = maxDiscount * 0.30;
  else if(currentBuyIn < secondSectorBreak) 
    currentDiscount = maxDiscount*0.80
  else
    currentDiscount = maxDiscount; 

return currentDiscount;
};




