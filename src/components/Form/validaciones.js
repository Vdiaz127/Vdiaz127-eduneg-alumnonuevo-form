
function esNumerico(valor) {
  const regex = /^\d+$/;
  if (regex.test(valor)) {
    return { status: "valid", errorMessage: "" };
  }
  return { status: "invalid", errorMessage: "El valor solo puede contener números." };
}

// Valida el largo del teléfono (entre 10 y 12 dígitos)
function largoTelefonoAdecuado(valor) {
  if (valor.length == 11 ) {
    return { status: "valid", errorMessage: "" };
  }
  return {
    status: "invalid",
    errorMessage: "El teléfono debe tener 11 dígitos. ej. 04141111111", 
  };
}

export function validarCedula(cedula) {
  const validaciones = [esNumerico, largoCedulaAdecuado];

  for (const validar of validaciones) {
    const resultado = validar(cedula);
    if (resultado.status !== "valid") {
      return resultado; // Retorna el primer error encontrado
    }
  }

  return { status: "valid", errorMessage: "" }; // Todo está válido
}

function largoCedulaAdecuado(cedula){
  if (cedula.length >= 7 &&  cedula.length < 9 ) {
    return { status: "valid", errorMessage: "" };
  }
  return {
    status: "invalid",
    errorMessage: "La cedula debe tener entre 7-8 digitos", 
  };
}


export function validarTelefono(telefono) {
  const validaciones = [esNumerico, largoTelefonoAdecuado];

  for (const validar of validaciones) {
    const resultado = validar(telefono);
    if (resultado.status !== "valid") {
      return resultado; // Retorna el primer error encontrado
    }
  }

  return { status: "valid", errorMessage: "" }; // Todo está válido
}


// Valida que el campo no esté vacío
function noVacio(valor) {
  if (valor.trim().length > 0) {
    return { status: "valid", errorMessage: "" };
  }
  return { status: "invalid", errorMessage: "El campo no puede estar vacío." };
}

// Valida el largo del nombre o apellido (máximo 20 caracteres)
function largoNombreAdecuado(valor) {
  if (valor.length <= 20) {
    return { status: "valid", errorMessage: "" };
  }
  return {
    status: "invalid",
    errorMessage: "El nombre o apellido debe tener como máximo 20 caracteres.",
  };
}


export function validarNombreApellido(valor) {
  const validaciones = [noVacio, largoNombreAdecuado];

  for (const validar of validaciones) {
    const resultado = validar(valor);
    if (resultado.status !== "valid") {
      return resultado; // Retorna el primer error encontrado
    }
  }

  return { status: "valid", errorMessage: "" }; // Todo está válido
}



export function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(correo)) {
    return { status: "valid", errorMessage: "" };
  }
  return { status: "invalid", errorMessage: "Formato de correo inválido." };
}



export function validarFechaNacimiento(fecha) {
  const fechaIngresada = new Date(fecha);
  const fechaHoy = new Date();
  if (fechaIngresada <= fechaHoy) {
    return { status: "valid", errorMessage: "" };
  }
  return {
    status: "invalid",
    errorMessage: "La fecha no puede ser mayor al día de hoy.",
  };
}


