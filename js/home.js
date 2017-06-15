window.onload = function(){

/**
 * Zorgt ervoor dat de gebruiker doorverwezen wordt naar de 
 * pagina van het vervoermiddel dat hij aangegeven heeft.
 * De locatie wordt meegegeven in de URL zoals de get-methode
 */

    var locForm = document.getElementById("locForm")
    locForm.onsubmit = function redirect(e) {

        e.preventDefault();
        window.name =  locForm.locat.value
        window.location = locForm.transp.value;
    }
}