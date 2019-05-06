import {
  buscarHomeContacto
} from "../js/utils/busquedaYAgregarFilas";

function contactoController() {

  $("#submitButton").prop("disabled", true);
  $(".form-control").one("blur", tieneContenido);
  $("#firstName").keyup(tieneContenido);
  $("#email").blur(esUnEmailValido);
  $("#comments").keyup(tieneContenido);
  $(".form-control").click(habilitarBoton);
  $("#submitButton").one("click", enviar);
  $("#idBtnBuscar").click(buscarHomeContacto);
} //fin guardadoController


function enviar() {
  if ($("#submitButton").prop("disabled", false)) {
    location.href = "http://127.0.0.1:8080/?#/home"
  }
}

function habilitarBoton() {
  var cantValidos = $(".is-valid");
  if (cantValidos.length == 3) {
    $("#submitButton").prop("disabled", false);
  } else {
    $("#submitButton").prop("disabled", true);
  }
}

function tieneContenido() {
  var campo = $(this);
  var id = campo.prop("id");

  if (campo.val().length == 0) {
    campo.addClass("is-invalid");
    campo.removeClass("is-valid");
    $("#msjError-" + id).text("el campo es requerido");
    $("#msjError-" + id).css("color", "red");
  } else {
    campo.addClass("is-valid");
    campo.removeClass("is-invalid");
    $("#msjError-" + id).text("");
  }
  habilitarBoton();
}

function esUnEmailValido() {
  var campo = $(this);
  var textoAMostrar = "";
  var esValido = true;

  if (!campo.val().includes("@")) {
    textoAMostrar += "Debe contener arroba (@) ";
    esValido = false;
  }
  if (!campo.val().includes(".")) {
    textoAMostrar += "Debe contener punto (.) ";
    esValido = false;
  }
  //verifica que el texto ingresado tenga formato de un mail
  var myRegex = /[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+/
  if (!myRegex.test(campo.val())) {
    textoAMostrar += "Verifique mail ";
    esValido = false;
  }

  if (esValido) {
    campo.addClass("is-valid");
    campo.removeClass("is-invalid");
    $("#msjError-email").text("");
  } else {
    campo.addClass("is-invalid");
    campo.removeClass("is-valid");
    $("#msjError-email").text(textoAMostrar);
    $("#msjError-email").css("color", "red");
  }
  habilitarBoton();
}


export default contactoController;