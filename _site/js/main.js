
var urlLink = 'jelldutr.github.io/'
// Aanpassen als website online komt!


/**
 * Zorgt ervoor dat de gebruiker doorverwezen wordt naar de 
 * pagina van het vervoermiddel dat hij aangegeven heeft.
 * De locatie wordt meegegeven in de URL zoals de get-methode
 */
var locForm = document.getElementById("locForm")
locForm.onsubmit = function redirect(e) {

    e.preventDefault();
    var x = locForm.transp.value + "/?locat=" + locForm.locat.value;

    window.location = x;
}


/**
 * Google Maps Api map object aanmaken
 */
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8
});