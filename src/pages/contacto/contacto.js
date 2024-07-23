// Referencias para formulario
const contactForm = document.forms["contactForm"]

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Referencia de inputs
    const emailRef = contactForm.elements["email"];
    const fullNameRef = contactForm.elements["fullName"];
    const phoneRef = contactForm.elements["phone"]
    const commentsRef = contactForm.elements["comments"];
    const termsandCondictionsRef = contactForm.elements["exampleCheck1"]

    // Sanitizar los datos
    emailRef.value = emailRef.value.trim().toLowerCase();
    fullNameRef.value = fullNameRef.value.trim();
    phoneRef.value = phoneRef.value.trim();
    commentsRef.value = commentsRef.value.trim();

    // Pasamos los datos a un objeto
    const formData = {
        fullName: fullNameRef.value,
        email: emailRef.value,
        phone: phoneRef.value,
        comments: commentsRef.value,
        termsandCondictions: termsandCondictionsRef.checked
    }
    console.table(formData);

    // Validar los datos del formulario
    const results = validateInputsForm(formData);

    if (results.isValid) {
        try {
            postContactForm();
            
        } catch (error) {
            const errorMessage = document.getElementById("post-error-message");
            errorMessage.innerHTML = "Error al enviar el formulario. Inténtalo de nuevo.";
            errorMessage.style.display = "block";
            setTimeout(() => errorMessage.style.display = "none", 5000);
        }
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.innerHTML = results.error;
        errorMessage.style.display = "block";
        setTimeout(() => errorMessage.style.display = "none", 5000);
    }
});

function validateInputsForm(formData) {
    let isValid = true;
    let error = "";

    if (!formData.fullName || formData.fullName.length < 2) {
        isValid = false;
        error = "El nombre completo debe tener al menos 2 caracteres.";
    } else if (!formData.email || !validateEmail(formData.email)) {
        isValid = false;
        error = "Por favor, introduce un correo electrónico válido.";
    } else if (!formData.phone || !validatePhone(formData.phone)) {
        isValid = false;
        error = "Por favor, introduce un número de teléfono válido.";
    } else if (!formData.comments || formData.comments.length < 5) {
        isValid = false;
        error = "Por favor, deja tus dudas o sugerencias con al menos 5 caracteres.";
    } else if (!formData.termsandCondictions) {
        isValid = false;
        error = "Debes aceptar los términos y condiciones.";
    }

    return { isValid, error };
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

function postContactForm() {
    // Simular envío de formulario
    //console.log("Formulario enviado correctamente");
}






function showSuccessMessage() {
    const successMessage = document.createElement("div");
    successMessage.className = "alert alert-success alert-success-lila my-2";
    //successMessage.innerHTML = "¡Formulario enviado correctamente!";
    contactForm.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 5000);
}


function postContactForm() {
    const templateParams = {
        fullName: contactForm.elements["fullName"].value,
        email: contactForm.elements["email"].value,
        phone: contactForm.elements["phone"].value,
        comments: contactForm.elements["comments"].value
    };

    (function() {
        emailjs.init("eToDepjFcMp--P6CW"); 
    

    emailjs.send("service_uzjz2mc","template_nlhxwj7" ,templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage();
        }, function(error) {
            console.log('FAILED...', error);
            const errorMessage = document.getElementById("post-error-message");
            errorMessage.innerHTML = "Error al enviar el formulario. Por favor, inténtalo de nuevo.";
            errorMessage.style.display = "block";
            setTimeout(() => errorMessage.style.display = "none", 5000);
        });
}

if (results.isValid) {
    try {
        postContactForm();
    } catch (error) {
        const errorMessage = document.getElementById("post-error-message");
        //errorMessage.innerHTML = "Error al enviar el formulario. Por favor, inténtalo de nuevo.";
        //errorMessage.style.display = "block";
        setTimeout(() => errorMessage.style.display = "none", 5000);
    }
} else {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = results.error;
    errorMessage.style.display = "block";
    setTimeout(() => errorMessage.style.display = "none", 5000);
}
}


function resetForm() {
    contactForm.reset();
}

function showSuccessMessage() {
    const successMessage = document.createElement("div");
    successMessage.className = "alert alert-success alert-success-lila my-2";
    successMessage.innerHTML = "¡Formulario enviado correctamente!";
    contactForm.appendChild(successMessage);
    setTimeout(() => {
        successMessage.remove();
        resetForm();
    }, 3000);
};