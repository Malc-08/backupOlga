document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    // Función para mostrar/ocultar la contraseña
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    togglePassword.addEventListener("click", function() {
        const type = passwordField.type === "password" ? "text" : "password";
        passwordField.type = type;
        this.classList.toggle("fa-eye-slash");
    });

    // Validación y almacenamiento en local storage
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Previene el envío del formulario

        // Obtener los valores de los campos
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Expresiones regulares para validar los campos
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[!@#])[A-Za-z\d!@#]{6,20}$/;

        // Validar el correo electrónico
        if (!emailRegex.test(email)) {
            alert("Por favor, introduce un correo electrónico válido.");
            return;
        }

        // Validar la contraseña
        if (!passwordRegex.test(password)) {
            alert("Contraseña no válida. Debe tener entre 6 y 20 caracteres e incluir al menos un número y un carácter especial (!@#).");
            return;
        }

        // Almacenar datos de usuario en el local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (!users.some(user => user.email === email)) {
            users.push({ email: email, password: password });
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            alert("El usuario ya está registrado.");
            return;
        }

        // Mostrar mensaje de éxito
        alert("Datos guardados con éxito.");
        form.reset(); // Opcional: limpiar el formulario después de enviar
    });

    // Verificar autenticación (puedes usar esto en otras páginas para verificar si el usuario está registrado)
    function authenticateUser(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.email === email && user.password === password);
    }
});