
var urlLink = 'jelldutr.github.io/'
// Aanpassen als website online komt!

var locForm = document.getElementById("locForm")
locForm.onsubmit = function redirect(e) {

    e.preventDefault();
    var x = locForm.transp.value + "/?locat=" + locForm.locat.value;

    window.location = x;
}
