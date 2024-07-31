document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;

        // Expresión regular para validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Valida que el campo de correo electrónico no esté vacío y cumpla con el formato
        if (email.trim() === "" || !emailRegex.test(email)) {
            alert("Por favor, introduce un correo electrónico válido.");
            return;
        }

        // Almacena el correo electrónico en localStorage
        let emails = JSON.parse(localStorage.getItem("emails")) || [];
        
        // Verifica si el correo ya existe en el array
        if (emails.includes(email)) {
            alert("Este correo electrónico ya ha sido registrado.");
            return;
        }

        // Agrega el nuevo correo electrónico al array
        emails.push(email);

        // Guarda el array actualizado en localStorage
        localStorage.setItem("emails", JSON.stringify(emails));

        // Llama a la función para enviar el correo electrónico utilizando emailjs
        enviarCorreoElectronico(email);
    });

    function enviarCorreoElectronico(email) {
        console.log(`Se enviará un correo electrónico de restablecimiento de contraseña a: ${email}`);

        // Configura Email.js y envía el correo electrónico
        emailjs.init("eToDepjFcMp--P6CW"); // Reemplaza con tu User ID de Email.js

        emailjs.send("service_bfi1ahv", "template_3gfceji", {
            to_email: email,
        }).then(function(response) {
            console.log('Correo electrónico enviado con éxito:', response);
            alert(`Se enviará un correo electrónico a ${email} para restablecer contraseña`);
            form.reset(); // Limpia el formulario después del envío
        }, function(error) {
            console.error('Error al enviar el correo electrónico:', error);
            alert('Hubo un problema al enviar el correo electrónico. Por favor, inténtalo más tarde.');
        });
    }
});
