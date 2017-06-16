window.onload = function(){

/**
 * Zorgt ervoor dat de gebruiker doorverwezen wordt naar de 
 * pagina van het vervoermiddel dat hij aangegeven heeft.
 * De locatie wordt meegegeven met window.name zodat het beschikbaar
 * is op de volgende pagina.
 */

    var locForm = document.getElementById("locForm")
    locForm.onsubmit = function redirect(e) {

        e.preventDefault();
        window.name = locForm.locat.value;
        window.location = locForm.transp.value;
    }
/**
 * Voegt de Google Places zoekbar toe.
 * Men kan dus gebruik maken van de autofill.
 */

var input = document.getElementById("goTo");
var searchBox = new google.maps.places.SearchBox(input);
/*searchBox.addListener('places_changed', function(){
    var place = searchBox.getPlaces();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    console.log(place);
});*/

}