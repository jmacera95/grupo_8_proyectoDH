window.addEventListener("load", async (e) => {
  // variables declaration
  const form = document.querySelector("#create-form");
  const errors = {};
  const kilometers = document.getElementById("kilometraje");
  const kilometersErrors = document.getElementById("kilometers-errors");
  const color = document.getElementById("color");
  const colorErrors = document.getElementById("color-errors");
  const validColors = [
    "black",
    "white",
    "grey",
    "green",
    "red",
    "yellow",
    "blue",
  ];
  const province = document.getElementById("provincia");
  const provinceErrors = document.getElementById("province-errors");
  const validProvinces = await getProvinces();
  const legalIdentifier = document.getElementById("legal_identifier");
  const legalIdentifierErrors = document.getElementById("legal_identifier-errors");
  const price = document.getElementById("precio");
  const priceErrors = document.getElementById("price-errors");

  // on-time vallidations
  kilometers.addEventListener("change", (e) => {
    if (kilometers.value == "") {
      const errorMessage = "Debes completar el campo kilometraje.";
      kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.kilometers = errorMessage;
      kilometers.focus();
    } else if (!(Number(kilometers.value) % 1) == 0) {
      const errorMessage = "El kilometraje no debe contener decimales.";
      kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.kilometers = errorMessage;
      kilometers.focus();
    } else if (kilometers.value < 85000 || kilometers.value > 200000) {
      const errorMessage =
        "El kilometraje no puede ser menor a 85.000 ni mayor a 200.000 kilómetros.";
      kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.kilometers = errorMessage;
      kilometers.focus();
    } else {
      kilometersErrors.innerHTML = "";
      delete errors.kilometers;
    }
  });

  color.addEventListener("change", (e) => {
    if (!validColors.includes(color.value)) {
      const errorMessage = "Selecciona un color válido.";
      colorErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.color = errorMessage;
      color.focus();
    } else {
      colorErrors.innerHTML = "";
      delete errors.color;
    }
  });

  province.addEventListener("change", (e) => {
    if (!validProvinces.includes(province.value)) {
      const errorMessage = "Selecciona una provincia válida.";
      provinceErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.province = errorMessage;
      province.focus();
    } else {
      provinceErrors.innerHTML = "";
      delete errors.province;
    }
  });

  legalIdentifier.addEventListener("change", (e) => {
    if (legalIdentifier.value == "") {
        const errorMessage = "Debes completar el campo patente.";
        legalIdentifierErrors.innerHTML = `<p>${errorMessage}</p>`;
        errors.legalIdentifier = errorMessage;
        legalIdentifier.focus();
    } else {
        legalIdentifierErrors.innerHTML = "";
        delete errors.legalIdentifier;
    }
  });

  price.addEventListener("change", (e) => {
    if (price.value == "") {
      const errorMessage = "Debes completar el campo precio.";
      priceErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.price = errorMessage;
      price.focus();
    } else if (!(Number(price.value) % 1) == 0) {
      const errorMessage = "El precio no debe contener decimales.";
      priceErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.price = errorMessage;
      price.focus();
    } else {
      priceErrors.innerHTML = "";
      delete errors.price;
    }
  });

  // on-submit validations
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // for debugging and development

    // Only some validations are performed again in case the field didn't suffer a change event
    if (kilometers.value == "") {
      const errorMessage = "Debes completar el campo kilometraje.";
      errors.kilometers = errorMessage;
    }
    if (!validColors.includes(color.value)) {
      const errorMessage = "Selecciona un color válido.";
      errors.color = errorMessage;
    }
    if (!validProvinces.includes(province.value)) {
        const errorMessage = "Selecciona una provincia válida.";
        errors.province = errorMessage;
    }
    if (legalIdentifier.value == "") {
        const errorMessage = "Debes completar el campo patente.";
        errors.legalIdentifier = errorMessage;
    }
    if (price.value == "") {
        const errorMessage = "Debes completar el campo precio.";
        errors.price = errorMessage;
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

      e.preventDefault();
    } else {
      form.submit();
    }
  });
});

function getProvinces() {
  return fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then((response) => response.json())
    .then((data) => {
      return data.provincias.map((provincia) => provincia.nombre);
    });
}
