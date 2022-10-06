export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Este campo nombre no puede estar vacio",
  },
  email: {
    valueMissing: "Este campo correo no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "Este campo contraseña no puede estar vacio",
    patternMismatch:
      "Al menos 6 caracteres hasta 12, debe contener una letra minuscula, una mayuscula y un numero",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacio",
    customError: "Debes tener mas de 18 años",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El campo requerido es XXXXXXXXXX",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
  },
  estado: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener mas de 18 años";
  }

  mayorDeEdad(fechaCliente);

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
