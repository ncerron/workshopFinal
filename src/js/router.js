import crossroads from "crossroads";
import homeController from "../controllers/homeController"
import personajesController from "../controllers/personajesController"
import guardadoController from "../controllers/guardadoController"
import contactoController from "../controllers/contactoController"

crossroads.addRoute("#/home", function () {
  $("#root").load("./partials/home.html", homeController);
})

crossroads.addRoute("#/personajes", function () {
  $("#root").load("./partials/personajes.html", personajesController);

})
crossroads.addRoute("#/guardado", function () {
  $("#root").load("./partials/guardado.html", guardadoController);

})
crossroads.addRoute("#/contacto", function () {
  $("#root").load("./partials/contacto.html", contactoController);

})
// En cada cambio del # va a verificar las rutas
$(window).on('hashchange', function () {
  crossroads.parse(window.location.hash)
})

crossroads.parse(window.location.hash)