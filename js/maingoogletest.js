window.onload = function(){

/**
 * Google Maps Api map object aanmaken
 */


/*map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 51.050401, lng: 3.725217},
  zoom: 14,
});

}*/
var map;
var service;
var infowindow;
var Gent = new google.maps.LatLng(51.050401,3.725217);


function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
      center: Gent,
      zoom: 15
    });

  var markers =[];
  markers = new google.maps.Marker({
    position: Gent,
    map: map,
  })
}
initMap();
}


