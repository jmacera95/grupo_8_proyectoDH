window.addEventListener("load", (e) => {
  // variables declaration
  const form = document.querySelector("#create-edit-form");
  const errors = {};
  const firstName = document.getElementById("firstName");
  const firstNameErrors = document.getElementById("first-name-errors");
  const lastName = document.getElementById("lastName");
  const lastNameErrors = document.getElementById("last-name-errors");
  const cuit = document.getElementById("cuit");
  const cuitErrors = document.getElementById("cuit-errors");
  const phone = document.getElementById("phone");
  const phoneErrors = document.getElementById("phone-errors");
  const email = document.getElementById("email");
  const emailErrors = document.getElementById("email-errors");
  const cp = document.getElementById("cp");
  const cpErrors = document.getElementById("cp-errors");
  const password = document.getElementById("password");
  const passwordErrors = document.getElementById("password-errors");
  const checkPassword = document.getElementById("checkPassword");
  const checkPasswordErrors = document.getElementById("check-password-errors");

  // on-time vallidations
  firstName.addEventListener("input", (e) => {
    if (firstName.value == "") {
      const errorMessage = "Debes completar el campo Nombre";
      firstNameErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.firstName = errorMessage;
      firstName.focus();
    } else if (firstName.value.length <= 2) {
      const errorMessage = "Debes ingresar un Nombre válido";
      firstNameErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.firstName = errorMessage;
      firstName.focus();
    } else {
      firstNameErrors.innerHTML = "";
      delete errors.firstName;
    }
  });
  lastName.addEventListener("input", (e) => {
    if (lastName.value == "") {
      const errorMessage = "Debes completar el campo Apellido";
      lastNameErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.lastName = errorMessage;
      lastName.focus();
    } else if (lastName.value.length <= 1) {
      const errorMessage = "Debes ingresar un Apellido válido";
      lastNameErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.lastName = errorMessage;
      lastName.focus();
    } else {
      lastNameErrors.innerHTML = "";
      delete errors.lastName;
    }
  });

  cuit.addEventListener("input", (e) => {
    const parseValue = parseInt(cuit.value)
    if (!parseValue) {
      const errorMessage = "Debes completar el campo CUIT con numeros";
      cuitErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.cuit = errorMessage;
      cuit.focus();
    } else if (cuit.value.length != 11) {
      const errorMessage = "Debe tener una longitud de 11 caracteteres";
      cuitErrors.innerHTML = `<p>${errorMessage} <a id="anses-link" href="https://www.anses.gob.ar/consulta/constancia-de-cuil">¿No conoces tu CUIT?</a></p>`;
      errors.cuit = errorMessage;
      cuit.focus();
    } else {
      cuitErrors.innerHTML = "";
      delete errors.cuit;
    }
  });

  phone.addEventListener("input", (e) => {
    const parseValue = parseInt(phone.value)
    if (!parseValue) {
      const errorMessage = "El campo telefono debe tener numeros unicamente";
      phoneErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.phone = errorMessage;
      phone.focus();
    } else if (phone.value.length != 8){
      const errorMessage = "Debe tener una longitud minima de 8 caracteres"
      phoneErrors.innerHTML = `<p>${errorMessage}</p>`
      errors.phone = errorMessage
      phone.focus()
    } else {
      phoneErrors.innerHTML = "";
      delete errors.phone;
    }
  });

  email.addEventListener("input", (e) => {
    if (email.value == "") {
      const errorMessage = "Debes completar el campo Email";
      emailErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.email = errorMessage;
      email.focus();
    } else {
      emailErrors.innerHTML = "";
      delete errors.email;
    }
  });

  cp.addEventListener("input", (e) => {
    const parseValue = parseInt(cp.value)
    if (!parseValue) {
      const errorMessage = "El código postal deben ser unicamente numeros";
      cpErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.cp = errorMessage;
      cp.focus();
    } else if (cp.value <= 1000 || cp.value >= 9999) {
      const errorMessage = "El Código Postal ingresado es incorrecto";
      cpErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.cp = errorMessage;
      cp.focus();
    } else {
      cpErrors.innerHTML = "";
      delete errors.cp;
    }
  });

  password.addEventListener("input", (e) => {
    if (password.value.length <= 5) {
      const errorMessage = "La contraseña debe tener mas de 6 caracteres";
      passwordErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.password = errorMessage;
      password.focus();
    } else {
      passwordErrors.innerHTML = "";
      delete errors.password;
    }
  });

  checkPassword.addEventListener("input", (e) => {
    if (checkPassword.value == "") {
      const errorMessage = "Debes confirmar la contraseña anteriormente ingresada";
      checkPasswordErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.checkPassword = errorMessage;
      checkPassword.focus();
    } else if (checkPassword.value != password.value) {
      const errorMessage = "La contraseña no coincide con la ingresada anteriormente";
      checkPasswordErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.checkPassword = errorMessage;
      checkPassword.focus();
    }
    else {
      checkPasswordErrors.innerHTML = "";
      delete errors.checkPassword;
    }
  });

  // on-submit validations
  form.addEventListener("submit", (e) => {

    e.preventDefault();

    // Only some validations are performed again in case the field didn't suffer a change event
    if (firstName.value == "") {
      const errorMessage = "Debes completar el campo Nombre.";
      errors.firstName = errorMessage;
    }
    if (lastName.value == "") {
      const errorMessage = "Debes completar el campo Apellido.";
      errors.lastName = errorMessage;
    }
    if (cuit.value == "") {
      const errorMessage = "Debes completar el campo CUIT.";
      errors.cuit = errorMessage;
    }
    if (phone.value == "") {
      const errorMessage = "Debes completar el campo Telefono.";
      errors.phone = errorMessage;
    }
    if (email.value == "") {
      const errorMessage = "Debes completar el campo email.";
      errors.email = errorMessage;
    }
    if (cp.value == "") {
      const errorMessage = "Debes completar el campo Código Postal.";
      errors.cp = errorMessage;
    }
    if (cp.value <= 1000 || cp.value >= 9999) {
      const errorMessage = "El Código Postal ingresado es incorrecto.";
      errors.cp = errorMessage;
    }
    if (password.value == "") {
      const errorMessage = "Debes completar el campo Contraseña.";
      errors.password = errorMessage;
    }
    if (checkPassword.value == "") {
      const errorMessage = "Debes completar el campo Confirmar Contraseña.";
      errors.checkPassword = errorMessage;
    }
    if (checkPassword.value != password.value) {
      const errorMessage = "La contraseña no coincide con la ingresada anteriormente";
      errors.checkPassword = errorMessage;
    }
    const errorsList = document.getElementById("errors_list");
    errorsList.innerHTML = "";


    if (Object.keys(errors).length > 0) {
      // remove each input specific error message so we can group them all in errors list in top of form
      document.querySelectorAll(".is-invalid").forEach((field) => {
        field.innerHTML = "";
      });

      // populate errors list in top of form
      errorsList.classList.add("alert-warning");
      errorsList.style.listStyleType = "none";
      Object.keys(errors).forEach((error) => {
        errorsList.innerHTML += `<li>${errors[error]}</li>`;
      });

      // scroll to top of view for errors to be visible
      window.scrollTo({ top: 0, behavior: "smooth" });


    } else {
      form.submit();
    }

  })
})
