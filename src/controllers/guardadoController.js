import {
  getLocalList,
  setLocalList
} from "../js/utils/localStorage";

import {
  agregarFila,
  buscar
} from "../js/utils/busquedaYAgregarFilas";



function guardadoController() {
  cargarPersonajes();
  $(document).on("click", "table tbody tr .btng", clickEliminar);
  $("#idBtnBuscar").click(buscar);
} //fin guardadoController

function clickEliminar() {
  var personajesLS = getLocalList("listaPersonajes");
  var id = $(this)
    .parent()
    .attr("id");
  for (let i = 0; i < personajesLS.length; i++) {
    if (personajesLS[i].id == id) {
      personajesLS.splice(i, 1);
      break;
    }
  }
  setLocalList("listaPersonajes", personajesLS);
  $("#" + id)
    .parent()
    .remove();
}

function cargarPersonajes() {
  var personajesLS = getLocalList("listaPersonajes");
  for (let i = 0; i < personajesLS.length; i++) {
    agregarFila(personajesLS, i, $("#tbodyG"));
  }

}

export default guardadoController;