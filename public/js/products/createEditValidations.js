window.addEventListener("load", (e) => {
    const form = document.querySelector("#create-form");
    const errors = {};

    const kilometers = document.getElementById("kilometraje");
    const kilometersErrors = document.getElementById("kilometers-errors");
    const color = document.getElementById("color");
    const colorErrors = document.getElementById("color-errors");
    const validColors = ["black", "white", "grey", "green", "red", "yellow", "blue"];

    // on-time vallidations
    kilometers.addEventListener("change", (e) => {
        if (kilometers.value == "") {
            const errorMessage = "Debes completar el campo kilometraje."
            kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
            errors.kilometers = errorMessage;
            kilometers.focus();
        }
        else if (!(Number(kilometers.value) % 1) == 0) {
            const errorMessage = "El kilometraje no debe contener decimales."
            kilometersErrors.innerHTML = `<p>${errorMessage}</p>`;
            errors.kilometers = errorMessage;
            kilometers.focus();
        } else if (kilometers.value < 85000 || kilometers.value > 200000) {
            const errorMessage = "El kilometraje no puede ser menor a 85.000 ni mayor a 200.000 kilómetros."
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
            const errorMessage = "Selecciona un color válido."
            colorErrors.innerHTML = `<p>${errorMessage}</p>`;
            errors.color = errorMessage;
            color.focus();
        } else {
            colorErrors.innerHTML = "";
            delete errors.color;
        }
    })

    // on-submit validations
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // for debugging and development
        
        if (kilometers.value == "") {
            const errorMessage = "Debes completar el campo kilometraje.";
            errors.kilometers = errorMessage;
        }
        if (!validColors.includes(color.value)) {
            const errorMessage = "Selecciona un color válido."            
            errors.color = errorMessage;
        }

        const errorsList = document.getElementById("errors_list");
        errorsList.innerHTML = "";

        if (Object.keys(errors).length > 0) {
            // remove each input specific error message so we can group them all in errors list in top of form
            document.querySelectorAll(".is-invalid").forEach(field => {
                field.innerHTML = "";
            })

            // populate errors list in top of form            
            errorsList.classList.add("alert-warning");
            errorsList.style.listStyleType = "none";
            Object.keys(errors).forEach(error => {
                errorsList.innerHTML += `<li>${errors[error]}</li>`
            }
            )
            
            window.scrollTo({top: 0, behavior: "smooth"});
            
            e.preventDefault();
        } else {
            alert("Producto creado satisfactoriamente")
        }
    });
    
})