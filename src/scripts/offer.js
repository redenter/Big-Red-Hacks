import 'normalize-css';

import '../styles/offer.styl';

$(() => {
  $('.branch').first().addClass('branch-current');
  $('.offer').first().addClass('offer-current');
  
  $('.right-offers .btn-add').click(() => {
    $('.modal').fadeToggle('fast');
  });
  $('.modal').click((e) => {
    if ($(e.target).parents('form').length>0 || $(e.target).is('form')){
      e.preventDefault();
      return;
    }
    $('.modal').fadeToggle('fast');
  });
});
