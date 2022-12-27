window.addEventListener("load", async (e) => {
  // variables declaration
  const form = document.querySelector("#create-edit-form");
  const errors = {};
  const vehicleModel = document.getElementById("vehicle_model");
  const vehicleModelErrors = document.getElementById("vehicle_model-errors");
  const validVehicleModels = await fetch(
    "http://localhost:3030/api/products/vehicles_models/active"
  )
    .then((response) => response.json())
    .then((vehiclesModels) =>
      vehiclesModels.data.map((vehicleModel) => vehicleModel.id)
    );
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
  const legalIdentifierErrors = document.getElementById(
    "legal_identifier-errors"
  );
  const validLegalIdentifierPattern = /^[A-Z0-9]+$/;
  const existingLegalIdentifiers = await fetch(
    "http://localhost:3030/api/products/validations/detalle"
  )
    .then((response) => response.json())
    .then((vehicles) =>
      vehicles.data.map((vehicle) => vehicle.legal_identifier.toUpperCase())
    );
  const validLegalIdentifierCheck = document.getElementById("valid-legal-identifier");
  const price = document.getElementById("precio");
  const priceErrors = document.getElementById("price-errors");
  const totalOwners = document.getElementById("cantidadDuenios");
  const totalOwnersErrors = document.getElementById("total_owners-errors");
  const validTotalOwners = [1, 2];
  const lastServiceDate = document.getElementById("fechaService");
  const lastServiceDateErrors = document.getElementById(
    "last_service_date-errors"
  );
  const clutchStatus = document.getElementById("embrague");
  const clutchStatusErrors = document.getElementById("clutch_status-errors");
  const validClutchStatus = ["fabrica", "repuesto"];
  const timingBeltAgeKilometers = document.getElementById("antiguedadCorrea");
  const timingBeltAgeKilometersErrors = document.getElementById(
    "timing_belt_age_kilometers-errors"
  );
  const lastBalancingAlignmentDate =
    document.getElementById("alineacionBalanceo");
  const lastBalancingAlignmentDateErrors = document.getElementById(
    "last_balancing_alignment_date-errors"
  );
  const airbagStatus = document.getElementById("airbag");
  const airbagStatusErrors = document.getElementById("airbag_status-errors");
  const validAirbagStatus = ["tiene-adelante", "tiene-ambos", "no"];
  const outstanding = document.getElementById("destacado");
  const outstandingErrors = document.getElementById("outstanding-errors");
  const validOutstanding = ["true", "false"];
  const image = document.getElementById("img");
  const imageErrors = document.getElementById("img-errors");
  const validImageExtensions = ["jpg", "png"];

  // on-time vallidations
  vehicleModel.addEventListener("change", (e) => {
    if (vehicleModel.value == "") {
      const errorMessage = "Debes completar el campo Modelo.";
      vehicleModelErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.vehicleModel = errorMessage;
      vehicleModel.focus();
    } else if (!validVehicleModels.includes(Number(vehicleModel.value))) {
      const errorMessage = "Selecciona un modelo de vehículo válido.";
      vehicleModelErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.vehicleModel = errorMessage;
      vehicleModel.focus();
    } else {
      vehicleModelErrors.innerHTML = "";
      delete errors.vehicleModel;
    }
  });

  kilometers.addEventListener("change", (e) => {
    if (kilometers.value == "") {
      const errorMessage = "Debes completar el campo Kilometraje.";
      kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.kilometers = errorMessage;
      kilometers.focus();
    } else if (!(Number(kilometers.value) % 1) == 0) {
      const errorMessage = "El kilometraje no debe contener decimales.";
      kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.kilometers = errorMessage;
      kilometers.focus();
    } else if (kilometers.value < 85000 || kilometers.value > 200000) {
      const errorMessage = "El kilometraje no puede ser menor a 85.000 ni mayor a 200.000 kilómetros.";
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

  legalIdentifier.addEventListener("keyup", (e) => {
    if (legalIdentifier.value == "") {
      const errorMessage = "Debes completar el campo Patente.";
      legalIdentifierErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.legalIdentifier = errorMessage;
      legalIdentifier.classList.remove("is-valid");
      validLegalIdentifierCheck.style.display = "none";
      legalIdentifier.focus();
    } else if (!validLegalIdentifierPattern.test(legalIdentifier.value)) {
      const errorMessage = `La patente debe escibirse en mayúscula y no debe contener espacios en blanco ni caracteres especiales.`;
      legalIdentifierErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.legalIdentifier = errorMessage;
      legalIdentifier.classList.remove("is-valid");
      validLegalIdentifierCheck.style.display = "none";
      legalIdentifier.focus();
    } else if (
      existingLegalIdentifiers.includes(legalIdentifier.value.toUpperCase())
    ) {
      const errorMessage = `El vehículo con patente ${legalIdentifier.value.toUpperCase()} ya existe en nuestra base de datos.`;
      legalIdentifierErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.legalIdentifier = errorMessage;
      legalIdentifier.classList.remove("is-valid");
      validLegalIdentifierCheck.style.display = "none";
      legalIdentifier.focus();
    } else {
      legalIdentifier.classList.add("is-valid");
      validLegalIdentifierCheck.style.display = "block";
      legalIdentifierErrors.innerHTML = "";
      delete errors.legalIdentifier;
    }
  })

  price.addEventListener("change", (e) => {
    if (price.value == "") {
      const errorMessage = "Debes completar el campo Precio.";
      priceErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.price = errorMessage;
      price.focus();
    } else if (!(Number(price.value) % 1) == 0 || Number(price.value) <= 0) {
      const errorMessage =
        "El precio no debe contener decimales y debe ser mayor a cero.";
      priceErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.price = errorMessage;
      price.focus();
    } else {
      priceErrors.innerHTML = "";
      delete errors.price;
    }
  });

  totalOwners.addEventListener("change", (e) => {
    if (totalOwners.value == "") {
      const errorMessage = "Debes completar el campo Cantidad de Dueños.";
      totalOwnersErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.totalOwners = errorMessage;
      totalOwners.focus();
    } else if (!validTotalOwners.includes(Number(totalOwners.value))) {
      const errorMessage =
        "El vehículo debe haber tenido como mínimo un dueño y como máximo dos.";
      totalOwnersErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.totalOwners = errorMessage;
      totalOwners.focus();
    } else {
      totalOwnersErrors.innerHTML = "";
      delete errors.totalOwners;
    }
  });

  lastServiceDate.addEventListener("change", (e) => {
    if (lastServiceDate.value == "") {
      const errorMessage = "Debes completar el campo Fecha Último Service.";
      lastServiceDateErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.lastServiceDate = errorMessage;
      lastServiceDate.focus();
    } else if (new Date(lastServiceDate.value) > new Date()) {
      const errorMessage =
        "La Fecha Último Service no puede ser mayor a la fecha actual.";
      lastServiceDateErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.lastServiceDate = errorMessage;
      lastServiceDate.focus();
    } else {
      lastServiceDateErrors.innerHTML = "";
      delete errors.lastServiceDate;
    }
  });

  clutchStatus.addEventListener("change", (e) => {
    if (clutchStatus.value == "") {
      const errorMessage = "Debes completar el campo Embrague.";
      clutchStatusErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.clutchStatus = errorMessage;
      clutchStatus.focus();
    } else if (!validClutchStatus.includes(clutchStatus.value)) {
      const errorMessage = "Selecciona un valor válido para el campo Embrague.";
      clutchStatusErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.clutchStatus = errorMessage;
      clutchStatus.focus();
    } else {
      clutchStatusErrors.innerHTML = "";
      delete errors.clutchStatus;
    }
  });

  timingBeltAgeKilometers.addEventListener("change", (e) => {
    if (timingBeltAgeKilometers.value == "") {
      const errorMessage =
        "Debes completar el campo Antiguedad Correa de Distribución.";
      timingBeltAgeKilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.timingBeltAgeKilometers = errorMessage;
      timingBeltAgeKilometers.focus();
    } else if (
      !(Number(timingBeltAgeKilometers.value) % 1) == 0 ||
      Number(timingBeltAgeKilometers.value) <= 0
    ) {
      const errorMessage =
        "La antiguedad de la correa de distribución no debe contener decimales y debe ser mayor a cero.";
      timingBeltAgeKilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.timingBeltAgeKilometers = errorMessage;
      timingBeltAgeKilometers.focus();
    } else {
      timingBeltAgeKilometersErrors.innerHTML = "";
      delete errors.timingBeltAgeKilometers;
    }
  });

  lastBalancingAlignmentDate.addEventListener("change", (e) => {
    if (lastBalancingAlignmentDate.value == "") {
      const errorMessage = "Debes completar el campo Alineación y Balanceo.";
      lastBalancingAlignmentDateErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.lastBalancingAlignmentDate = errorMessage;
      lastBalancingAlignmentDate.focus();
    } else if (new Date(lastBalancingAlignmentDate.value) > new Date()) {
      const errorMessage =
        "La fecha de la última alineación y balanceo no puede ser mayor a la fecha actual.";
      lastBalancingAlignmentDateErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.lastBalancingAlignmentDate = errorMessage;
      lastBalancingAlignmentDate.focus();
    } else {
      lastBalancingAlignmentDateErrors.innerHTML = "";
      delete errors.lastBalancingAlignmentDate;
    }
  });

  airbagStatus.addEventListener("change", (e) => {
    if (airbagStatus.value == "") {
      const errorMessage = "Debes completar el campo Airbag.";
      airbagStatusErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.airbagStatus = errorMessage;
      airbagStatus.focus();
    } else if (!validAirbagStatus.includes(airbagStatus.value)) {
      const errorMessage = "Selecciona un valor válido para el campo Airbag.";
      airbagStatusErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.airbagStatus = errorMessage;
      airbagStatus.focus();
    } else {
      airbagStatusErrors.innerHTML = "";
      delete errors.airbagStatus;
    }
  });

  outstanding.addEventListener("change", (e) => {
    if (outstanding.value == "") {
      const errorMessage = "Debes completar el campo Destacado.";
      outstandingErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.outstanding = errorMessage;
      outstanding.focus();
    } else if (!validOutstanding.includes(outstanding.value)) {
      const errorMessage =
        "Selecciona un valor válido para el campo Destacado.";
      outstandingErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.outstanding = errorMessage;
      outstanding.focus();
    } else {
      outstandingErrors.innerHTML = "";
      delete errors.outstanding;
    }
  });

  image.addEventListener("change", (e) => {
    if (image.value == "" && !window.location.pathname.includes("edit")) {
      const errorMessage = "Debes subir una imagen del vehículo.";
      imageErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.image = errorMessage;
      image.focus();
    } else if (!validImageExtensions.includes(image.value.split(".").pop())) {
      const errorMessage =
        "Los formatos aceptados para la imagen del vehículo son 'jpg' y 'png'.";
      imageErrors.innerHTML = `<p>${errorMessage}</p>`;
      errors.image = errorMessage;
      image.focus();
    } else {
      imageErrors.innerHTML = "";
      delete errors.image;
    }
  });

  // on-submit validations
  form.addEventListener("submit", (e) => {
    // Only some validations are performed again in case the field didn't suffer a change event
    if (vehicleModel.value == "") {
      const errorMessage = "Debes completar el campo Modelo.";
      errors.vehicleModel = errorMessage;
    }
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
    if (totalOwners.value == "") {
      const errorMessage = "Debes completar el campo Cantidad de Dueños.";
      errors.totalOwners = errorMessage;
    }
    if (lastServiceDate.value == "") {
      const errorMessage = "Debes completar el campo Fecha Último Service.";
      errors.lastServiceDate = errorMessage;
    }
    if (clutchStatus.value == "") {
      const errorMessage = "Debes completar el campo Embrague.";
      errors.clutchStatus = errorMessage;
    }
    if (timingBeltAgeKilometers.value == "") {
      const errorMessage =
        "Debes completar el campo Antiguedad Correa de Distribución.";
      errors.timingBeltAgeKilometers = errorMessage;
    }
    if (lastBalancingAlignmentDate.value == "") {
      const errorMessage = "Debes completar el campo Alineación y Balanceo.";
      errors.lastBalancingAlignmentDate = errorMessage;
    }
    if (airbagStatus.value == "") {
      const errorMessage = "Debes completar el campo Airbag.";
      errors.airbagStatus = errorMessage;
    }
    if (outstanding.value == "") {
      const errorMessage = "Debes completar el campo Destacado.";
      errors.outstanding = errorMessage;
    }
    if (image.value == "" && !window.location.pathname.includes("edit")) {
      const errorMessage = "Debes subir una imagen del vehículo.";
      errors.image = errorMessage;
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
