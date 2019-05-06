import {
  getLocalList
} from "../utils/localStorage";


function agregarFila(listaPersonajesLocal, i, elemento) {
  elemento.append(`<tr><td>${listaPersonajesLocal[i].id}</td><td>${
    listaPersonajesLocal[i].nombre}</td><td>${listaPersonajesLocal[i].genero}</td>
    <td>${listaPersonajesLocal[i].altura}</td><td>${listaPersonajesLocal[i].peso}</td>
    <td>${listaPersonajesLocal[i].ojos}</td><td id="${listaPersonajesLocal[i].id}">
    <button type='button' class='btng btn btn-danger btn-sm'>Eliminar</button></td>
            </tr>`);
};


function buscarHomeContacto() {
  $("#busqueda").empty();
  var textoABuscar = $("#txtBuscar").val();
  var listaPersonajesLocal = getLocalList("listaPersonajes");
  if (textoABuscar.length > 0) {
    $("#busqueda").append(
      $(`<table class="table table-hover table-dark">
    <thead>
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Genero</th>
        <th>Altura</th>
        <th>Peso</th>
        <th>Color de ojos</th>
        <th></th>
      </tr>
    </thead>
    <tbody>

    </tbody>
    </table>`)
    );

    for (let i = 0; i < listaPersonajesLocal.length; i++) {
      if (listaPersonajesLocal[i].nombre.toUpperCase().includes(textoABuscar.toUpperCase())) {
        agregarFila(listaPersonajesLocal, i, $("tbody"));

      }
    }
    if (!$("tbody tr").length > 0) {
      $("tbody").append($(`<tr><td colspan="3">No se encontro ninguna coincidencia</td></tr>`));
    }

  } else {
    $("#busqueda").append($(`<tr><td colspan="3">ingrese palabra a buscar</td></tr>`));
  }

}

function buscar() {
  $("tbody").remove();
  $("table").append($(document.createElement("tbody")));
  var textoABuscar = $("#txtBuscar").val();
  var listaPersonajesLocal = getLocalList("listaPersonajes");
  if (textoABuscar.length > 0) {
    for (let i = 0; i < listaPersonajesLocal.length; i++) {
      if (
        listaPersonajesLocal[i].nombre
        .toUpperCase()
        .includes(textoABuscar.toUpperCase())
      ) {
        $("tbody").append(`<tr><td>${listaPersonajesLocal[i].id}</td><td>${listaPersonajesLocal[i].nombre}</td>
        <td>${listaPersonajesLocal[i].genero}</td><td>${listaPersonajesLocal[i].altura}</td>
        <td>${listaPersonajesLocal[i].peso}</td><td>${listaPersonajesLocal[i].ojos}</td>
        <td id="${listaPersonajesLocal[i].id}"><button type='button' class='btng btn btn-danger btn-sm'>Eliminar</button></td>
        </tr>`);
      }
    }
    if (!$("tbody tr").length > 0) {
      $("tbody").append($(`<tr><td colspan="3">No se encontro ninguna coincidencia</td></tr>`));
    }
  } else {
    $("tbody").append($(`<tr><td colspan="3">ingrese palabra a buscar</td></tr>`));
  }
}


export {
  agregarFila,
  buscarHomeContacto,
  buscar
}