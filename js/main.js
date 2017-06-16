window.onload = function() {

var gent = [51.054344, 3.721660]; // Start locatie
/**
 * Map Setup Leaflet & Mapbox
 */
var mymap = L.map('mapid').setView(gent, 14);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamVsbGR1dHIiLCJhIjoiY2ozeTh0cTcyMDAxMjJ3bGJhdTR1cHVsbCJ9.mEm-yeidnWPkrugmE0PaQA'
}).addTo(mymap);

/**
 * Database Import Bezetting Parking
*/ 

var url = 'https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json';//Database met bezettingsgraad van de parkings in Gent

/**
 * 
 * @param {*string} url Url naar de online Database
 * @param {*function} successHandler Functie die uitgevoerd wordt bij succesvol laden DB
 * @param {*function} errorHandler Functie die uitgevoerd wordt bij falen laden DB
 */
function getJSON(url, successHandler, errorHandler){
        var xhr = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4){
                if (xhr.status == 200) {
                    var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                    successHandler && successHandler(data);
                } else {
                    errorHandler && errorHandler(status);
                }
            }
        };
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.send();
    
}
/**
 * Aanroepen van de database en bepaalde handeling uitvoeren als succes
 * indien een error: wegschrijven naar console
 */
getJSON(url,
    function(data) {
        for(var i in data){ //for in loop voor elk object
            var marker = L.marker([data[i].latitude, data[i].longitude],{icon: parkingIcon}).addTo(mymap); //voegt een marker toe
            marker.bindPopup("<h3>"+data[i].name+"</h3><br /> <b> Vrije plaatsen: "+data[i].parkingStatus.availableCapacity+"</b>");
        }
                
    },
    function(status) {
        console.log(status);
    }
);
/**
 * Standaardicoon voor popup aanpassen naar nieuw icoon Parking
 */
var parkingIcon = L.icon({
    iconUrl: 'images/parkingpopup.png',
    shadowUrl: 'images/parkingshadow.png',

    iconSize: [25,41], //grootte van icon
    shadowSize: [30,21], //grootte van schaduw
    iconAnchor: [12,41], //ankerpunt icon
    shadowAnchor: [0,21], // ankerpunt schaduw
    popupAnchor: [0, -50] //ankerpunt popup
});


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

var googleSearchUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + window.name + "&key=AIzaSyDLpBgfSlOI_tOZyeWZ83VBYcgI88qc7qo";

getJSON(googleSearchUrl,
    function(data) {
        for(var i in data){ //for in loop voor elk object
        console.log(data[i].results.geometry.location.lat)
        }                
    },
    function(status) {
        console.log(status);
    }
);


} // End of ONLOAD function