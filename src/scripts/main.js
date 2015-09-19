import 'normalize-css';

import '../styles/index.styl';

var GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.load(function(google) {
    var myLatLng = {lat: -25.363, lng: 131.044};

    new google.maps.Map($('#map'), {
      center: myLatLng,
      scrollwheel: false,
      zoom: 4
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Hello World!'
    });
});

$(() => {
});
