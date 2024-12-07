function largoAdecuado(string) {
    if (string.length > 0 && string.length < 20) {
      return { status: "valid", errorMessage: "" }; // Sin error
    }
    return { status: "invalid", errorMessage: "El nombre debe tener entre 1 y 20 caracteres." };
  }
  
  export function ValidacionesNombreApellido(string) {
    if (string === "") {
      return { status: "empty", errorMessage: "El campo no puede estar vacío." };
    }
  
    return largoAdecuado(string);
  }
  