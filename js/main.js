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

var url = 'https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json';

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

getJSON(url,
    function(data) {
        for(var i in data){ //for in loop voor elk object
            var marker = L.marker([data[i].latitude, data[i].longitude]).addTo(mymap); //voegt een marker toe
            marker.bindPopup("<h3>"+data[i].name+"</h3><b> Vrije plaatsen: "+data[i].parkingStatus.availableCapacity+"</b>").openPopup();
        }
                
    },
    function(status) {
        console.log(status);
    }
);



} // End of ONLOAD function