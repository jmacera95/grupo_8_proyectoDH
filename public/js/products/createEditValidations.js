window.addEventListener("load", (e) => {
    const form = document.querySelector("form");
    const errors = {};

    const kilometers = document.getElementById("kilometraje");
    const kilometersErrors = document.getElementById("kilometers-errors");

    kilometers.addEventListener("change", (e) => {
        if (kilometers.value == "") {
            const errorMessage = "Debes completar el campo kilometraje."
            kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
            errors.kilometers = errorMessage;
        }
        else if (!(Number(kilometers.value) % 1) == 0) {
            const errorMessage = "El kilometraje no debe contener decimales."
            kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
            errors.kilometers = errorMessage;
        } else if (kilometers.value < 85000 || kilometers.value > 200000) {
            const errorMessage = "El kilometraje no puede ser menor a 85.000 ni mayor a 200.000 kilómetros."
            kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
            errors.kilometers = errorMessage;
        } else {
            kilometersErrors.innerHTML = "";
            delete errors.kilometers; 
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (kilometers.value == "") {
            const errorMessage = "Debes completar el campo kilometraje.";
            errors.kilometers = errorMessage;
        }
        console.log(Object.keys(errors).length);
        if (Object.keys(errors).length > 0) {
            console.log(errors);
            e.preventDefault();
        } 
    });
    
})