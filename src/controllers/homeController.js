import {
  buscarHomeContacto
} from "../js/utils/busquedaYAgregarFilas";

function homeController() {
  $("#idBtnBuscar").click(buscarHomeContacto);
}

export default homeController;