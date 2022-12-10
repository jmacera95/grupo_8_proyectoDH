window.addEventListener("load", async (e) => {
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
  firstName.addEventListener("change", (e) => {
    if (firstName.value == "") {
      const errorMessage = "Debes completar el campo Nombre";
      firstNameErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.firstName = errorMessage;
      firstName.focus();
    } else {
      firstNameErrors.innerHTML = "";
      delete errors.firstName;
    }
  });
  lastName.addEventListener("change", (e) => {
    if (lastName.value == "") {
      const errorMessage = "Debes completar el campo Apellido";
      lastNameErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.lastName = errorMessage;
      lastName.focus();
    } else {
      lastNameErrors.innerHTML = "";
      delete errors.lastName;
    }
  });
  
  cuit.addEventListener("change", (e) => {
    if (cuit.value == "") {
      const errorMessage = "Debes completar con tu CUIT";
      cuitErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.cuit = errorMessage;
      cuit.focus();
    } else {
      cuitErrors.innerHTML = "";
      delete errors.cuit;
    }
  });

  phone.addEventListener("change", (e) => {
    if (phone.value == "") {
      const errorMessage = "Debes completar con tu CUIT";
      phoneErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.phone = errorMessage;
      phone.focus();
    } else {
      phoneErrors.innerHTML = "";
      delete errors.phone;
    }
  });

  email.addEventListener("change", (e) => {
    if (email.value == "") {
      const errorMessage = "Debes completar con tu CUIT";
      emailErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.email = errorMessage;
      email.focus();
    } else {
      emailErrors.innerHTML = "";
      delete errors.email;
    }
  });

  cp.addEventListener("change", (e) => {
    if (cp.value == "") {
      const errorMessage = "Debes completar con tu CUIT";
      cpErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.cp = errorMessage;
      cp.focus();
    } else {
      cpErrors.innerHTML = "";
      delete errors.cp;
    }
  });

  password.addEventListener("change", (e) => {
    if (password.value == "") {
      const errorMessage = "Debes elegir una contraseña";
      passwordErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.password = errorMessage;
      password.focus();
    } else {
      passwordErrors.innerHTML = "";
      delete errors.password;
    }
  });

  checkPassword.addEventListener("change", (e) => {
    if (checkPassword.value == "") {
      const errorMessage = "Debes confirmar la contraseña anteriormente ingresada";
      checkPasswordErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.checkPassword = errorMessage;
      checkPassword.focus();
    } else if (checkPassword.value != password.value){
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
    // Only some validations are performed again in case the field didn't suffer a change event
    if (vehicleModel.value == "") {
      const errorMessage = "Debes completar el campo Modelo.";
      errors.vehicleModel = errorMessage;
    }
    })
})