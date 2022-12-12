window.addEventListener("load", async (e) => {
    // variables declaration
    const form = document.querySelector("#login-form");
    const errors = {};
    const email = document.getElementById("email");
    const emailErrors = document.getElementById("email-errors");
    const password = document.getElementById("password");
    const passwordErrors = document.getElementById("password-errors");

    email.addEventListener("change", (e) => {
        if (email.value == "") {
            const errorMessage = "Debes ingresar tu email";
            emailErrors.innerHTML = `<p>${errorMessage}</p>`;
            errors.email = errorMessage;
            email.focus();
        } else {
            emailErrors.innerHTML = "";
            delete errors.email;
        }
    });

    password.addEventListener("change", (e) => {
        if (password.value == "") {
            const errorMessage = "Debes ingresar la contraseña";
            passwordErrors.innerHTML = `<p>${errorMessage}</p>`;
            errors.password = errorMessage;
            password.focus();
        } else {
            passwordErrors.innerHTML = "";
            delete errors.password;
        }
    });


    //   form.addEventListener("submit", (e) => {
    //     if (email.value == "") {
    //         const errorMessage = "Debes completar el campo email.";
    //         errors.email = errorMessage;
    //       }
    //       if (password.value == "") {
    //         const errorMessage = "Debes completar el campo Contraseña.";
    //         errors.password = errorMessage;
    //       }

    //     const errorsList = document.getElementById("errors_list");
    //     errorsList.innerHTML = "";

    // if (Object.keys(errors).length > 0) {
    //     // remove each input specific error message so we can group them all in errors list in top of form
    //     document.querySelectorAll(".invalid").forEach((field) => {
    //       field.innerHTML = "";
    //     });

    //     // populate errors list in top of form
    //     errorsList.classList.add("alert-warning");
    //     errorsList.style.listStyleType = "none";
    //     Object.keys(errors).forEach((error) => {
    //       errorsList.innerHTML += `<li>${errors[error]}</li>`;
    //     });

    //     // scroll to top of view for errors to be visible
    //     window.scrollTo({ top: 0, behavior: "smooth" });

    //     e.preventDefault();

    //   } else {
    //     form.submit();
    //   }

    // })

})