import {
  getLocalList,
  setLocalList
} from "../js/utils/localStorage";
import {
  buscar
} from "../js/utils/busquedaYAgregarFilas";

function personajesController() {
  cargarPersonajes();
  setTimeout(ordenarTabla, 5000);
  setTimeout(mostrarAlIniciar, 8000);

  $("#btnVerMas").click(clickCargarMas);
  $(document).on("click", "table tbody tr .btnp", clickAgregar);
  $("#idBtnBuscar").click(function () {
    clearTimeout(ordenarTabla);
    clearTimeout(mostrarAlIniciar);
    $("#btnVerMas").hide();
    $("#loader").hide();
    buscar();
  });
} //fin personajesController

var x = 10;

function clickCargarMas() {
  var cantidadPersonajes = $("tbody tr").length;
  if (x <= cantidadPersonajes) {
    x = x + 10;
    $("tbody tr:lt(" + x + ")").show();
  } else {
    $(this).attr("disabled", true);
  }
}

function clickAgregar() {
  var listaPersonajesLocal = getLocalList("listaPersonajes");
  var id = $(this)
    .parent()
    .attr("id");
  var lista = $(this)
    .parent()
    .parent()[0];

  var personajeAgregrar = {
    id: lista.getElementsByTagName("TD")[0].innerHTML,
    nombre: lista.getElementsByTagName("TD")[1].innerHTML,
    genero: lista.getElementsByTagName("TD")[2].innerHTML,
    altura: lista.getElementsByTagName("TD")[3].innerHTML,
    peso: lista.getElementsByTagName("TD")[4].innerHTML,
    ojos: lista.getElementsByTagName("TD")[5].innerHTML
  };

  if (listaPersonajesLocal.length > 0) {
    for (let index = 0; index < listaPersonajesLocal.length; index++) {
      if (
        listaPersonajesLocal[index].nombre.toUpperCase() ===
        lista.getElementsByTagName("TD")[1].innerHTML.toUpperCase()
      ) {
        break;
      } else {
        listaPersonajesLocal.push(personajeAgregrar);
      }
    }
  }

  if (listaPersonajesLocal.length == 0) {
    listaPersonajesLocal.push(personajeAgregrar);
  }

  var listaSinDuplicados = Array.from(
    new Set(listaPersonajesLocal.map(a => a.id))
  ).map(id => {
    return listaPersonajesLocal.find(a => a.id === id);
  });

  setLocalList("listaPersonajes", listaSinDuplicados);

  $("#" + id)
    .parent()
    .remove();
}

function cargarPersonajes() {
  var url = "https://swapi.co/api/people/";
  var urlTotal = "";
  for (let index = 1; index <= 87; index++) {
    urlTotal = url + index;
    getData(urlTotal, creaElementos, index);
  }
}

function mostrarAlIniciar() {
  $("tbody tr:lt(9)").show();
  $("#loader").hide();
}

function creaElementos(msgError, infoApi, index) {
  if (infoApi) {
    var genero = "";
    var color_ojos = "";

    if (infoApi.gender == "female") {
      genero = "Mujer";
    } else if (infoApi.gender == "male") {
      genero = "Hombre";
    } else {
      genero = "No aplica";
    }

    switch (infoApi.eye_color) {
      case "blue":
        color_ojos = "azul";
        break;
      case "yellow":
        color_ojos = "amarillo";
        break;
      case "red":
        color_ojos = "rojo";
        break;
      case "brown":
        color_ojos = "marron";
        break;
      case "blue-gray":
        color_ojos = "azul grisáceo";
        break;
      case "black":
        color_ojos = "rojo";
        break;
      case "orange":
        color_ojos = "naranja";
        break;
      case "hazel":
        color_ojos = "avellana";
        break;
      case "unknown":
        color_ojos = "desconocido";
        break;
      case "gold":
        color_ojos = "dorado";
        break;
      case "white":
        color_ojos = "blanco";
        break;
      case "dark":
        color_ojos = "oscuro";
        break;
      case "green, yellow":
        color_ojos = "verde, amarillo";
        break;
      case "red, blue":
        color_ojos = "rojo, azul";
        break;
      case "pink":
        color_ojos = "rosa";
        break;
      default:
        break;
    }

    if (infoApi.height == "unknown") {
      infoApi.height = "?";
    }

    if (infoApi.mass == "unknown") {
      infoApi.mass = "?";
    }

    $("#tbody").append(
      `<tr style="display:none;">
      <td>${index}</td><td>${infoApi.name}</td>
      <td>${genero}</td><td>${infoApi.height + " CM"}</td>
      <td>${infoApi.mass + " KG"}</td><td>${color_ojos}</td>
      <td id="${index}"><button type='button' class='btnp btn btn-success btn-sm'>Agregar</button></td>
      </tr>`
    );
  }
  if (msgError) {
    console.log("error al cargar " + msgError.status);
  }
}

function getData(url, cbk, index) {
  $.ajax(url)
    .done(function (data) {
      cbk(null, data, index);
    })
    .fail(function (error) {
      cbk(error);
    });
}

function ordenarTabla() {
  var lista = $("tbody tr");
  for (let i = 0; i < lista.length - 1; i++) {
    for (let j = i + 1; j < lista.length; j++) {
      var x = lista[i].getElementsByTagName("TD")[0];
      var y = lista[j].getElementsByTagName("TD")[0];
      if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
        var variableauxiliar = lista[i];
        lista[i] = lista[j];
        lista[j] = variableauxiliar;
        lista[j].before(lista[i]);
      }
    }
  }
}



export default personajesController;