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




/*var input = "Gent, België";
var searchBox = new google.maps.places.SearchBox(input);
console.log("hey" + searchBox);

function locatie () {
      var place = searchBox.getPlace();

      if (places.length == 0) {
        return;
      }

      var group = L.featureGroup();

      places.forEach(function(place) {

        // Create a marker for each place.
        console.log(places);
        console.log(place.geometry.location.lat() + " / " + place.geometry.location.lng());
        var marker = L.marker([
          place.geometry.location.lat(),
          place.geometry.location.lng()
        ]);
        group.addLayer(marker);
      });

      group.addTo(mymap);
      map.fitBounds(group.getBounds());

    };
locatie();*/

/*var googleSearchUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + window.name.replace(/[^a-zA-Z0-9-_]/g, '') + "&key=AIzaSyDLpBgfSlOI_tOZyeWZ83VBYcgI88qc7qo";

getJSON(googleSearchUrl,
    function(data) {
        for(var i in data){ //for in loop voor elk object
            var marker = L.marker([data[i].latitude, data[i].longitude]).addTo(mymap); //voegt een marker toe
            marker.bindPopup("<h3>"+data[i].name+"</h3><br /> <b> Vrije plaatsen: "+data[i].parkingStatus.availableCapacity+"</b>");        }                
    },
    function(status) {
        console.log(status);
    }
);

console.log(googleSearchUrl);*/
