window.onload = function() {

var gent = [51.054344, 3.721660]; // Start locatie
var zoom = 12; //Start zoom
/**
 * Map Setup Leaflet & Mapbox
 */
var mymap = L.map('mapid').setView(gent, zoom);

var standardMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamVsbGR1dHIiLCJhIjoiY2ozeTh0cTcyMDAxMjJ3bGJhdTR1cHVsbCJ9.mEm-yeidnWPkrugmE0PaQA'
}).addTo(mymap);


/**
 * Database Import Taxi locaties
*/ 

var urlTaxi = 'https://datatank.stad.gent/4/mobiliteit/taxilocaties.geojson';//Database met de taxi locaties in Gent

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

var taxi = {}

getJSON(urlTaxi,
    function(data) {
        for (var i in data.coordinates){
            var taxi = L.marker([data.coordinates[i]["1"], data.coordinates[i]["0"]],{icon: taxiIcon}).addTo(mymap); //voegt een marker toe
            taxi.bindPopup("Taxi-standplaats");
        }            
    },
    function(status) {
        console.log(status);
    }
);

/**
 * Standaardicoon voor popup aanpassen naar nieuw icoon Taxi's
 */
var taxiIcon = L.icon({
    iconUrl: 'images/taxi.png',
    shadowUrl: 'images/parkingshadow.png',

    iconSize: [25,41], //grootte van icon
    shadowSize: [30,21], //grootte van schaduw
    iconAnchor: [12,41], //ankerpunt icon
    shadowAnchor: [0,21], // ankerpunt schaduw
    popupAnchor: [0, -50] //ankerpunt popup
});

/* DATA NIET BESCHIKBAAR OP DATA GENT, LATER NOG EENS PROBEREN
var urlCambio = '';

getJSON(urlCambio,
    function(data) {
        for (var i in data.coordinates){
            var marker = L.marker([data.coordinates[i]["1"], data.coordinates[i]["0"]],{icon: fietsIcon}).addTo(mymap); //voegt een marker toe
            marker.bindPopup("Taxi's");
        }            
    },
    function(status) {
        console.log(status);
    }
);*/ 

var urlObjDeLijn = {
    1: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn1",
    3: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn3",
    4: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn4",
    5: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn5",
    17: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn17",
    18: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn18",
    21: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn21",
    22: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn22",
    38: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn38",
    39: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn39",
    70: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn70",
    71: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn71",
    72: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn72",
    76: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn76",
    77: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn77",
    78: "https://datatank.stad.gent/4/mobiliteit/delijnhalteslijn78"
};

var haltesObj = {};
var haltes = {};

for (var r in urlObjDeLijn){
    getJSON(urlObjDeLijn[r],
        function(data) {
            for (var i in data.rtLijnRitten){
                for (var t in data.rtLijnRitten[i].rtDoortochten){
                    var haltes = L.marker([data.rtLijnRitten[i].rtDoortochten[t*2].coordinaat.lt, data.rtLijnRitten[i].rtDoortochten[t*2].coordinaat.ln],{icon: tramIcon}).addTo(mymap);
                    haltesObj[data.rtLijnRitten[i].rtDoortochten[t*2].halteNummer] = haltesObj[data.rtLijnRitten[i].rtDoortochten[t*2].halteNummer] + ", " + data.lijnNummerPubliek;
                    haltesObj[data.rtLijnRitten[i].rtDoortochten[t*2].halteNummer] = haltesObj[data.rtLijnRitten[i].rtDoortochten[t*2].halteNummer].replace('undefined, ', "");
                    haltes.bindPopup("<b>" + data.rtLijnRitten[i].rtDoortochten[t*2].omschrijvingLang + "</b></br>Lijn(en): " + haltesObj[data.rtLijnRitten[i].rtDoortochten[t*2].halteNummer]);
                }
            }           
        },
        function(status) {
            console.log(status);
        }
    );
};

/**
 * Standaardicoon voor popup aanpassen naar nieuw icoon Fietsvoorziening
 */
var tramIcon = L.icon({
    iconUrl: 'images/halte.png',
    shadowUrl: 'images/halteshadow.png',

    iconSize: [20,24], //grootte van icon
    shadowSize: [25,24], //grootte van schaduw
    iconAnchor: [10,24], //ankerpunt icon
    shadowAnchor: [2,24], // ankerpunt schaduw
    popupAnchor: [0, -25] //ankerpunt popup
});

/**
 * Maakt een layergroup overlays
 */
var overlays = {
    "Bus- en Tramhaltes": haltes,
    "Taxi-staanplaatsen": taxi    
};

/**
 * Maakt een layer controller waarbij de overlays uit of ingeschakeld kunnen worden.
 */
L.control.layers("", overlays).addTo(mymap);

/**
 * Haalt de zoekterm van de vorige pagina uit window.name
 * google Places zoekt naar de locatie en maakt een marker op
 * dat bepaalde punt.
 */

var request = {
    query: window.name
};
var mapCenterLat = ""; 
var mapCenterLng = ""; //variabelen aanmaken voor nieuwe Lat en Lng;

service = new google.maps.places.PlacesService(document.createElement('div'));
service.textSearch(request, callback);
function callback(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var marker = L.marker([results[i].geometry.location.lat(), results[i].geometry.location.lng()]).addTo(mymap); //voegt een marker toe
            marker.bindPopup(results[i].formatted_address).openPopup; //voegt een popup toe aan de marker met de zoekterm
            mymap.setView([results[i].geometry.location.lat(), results[i].geometry.location.lng()], zoom); // centreerd de kaart op de gekozen locatie

        }
    }
}

window.name = ""; //Cleart window.name

}