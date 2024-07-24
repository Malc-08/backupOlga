document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const fullName = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('password');

    const validateFullName = (name) => {
        const regex = /^[a-zA-Z\s]{2,50}$/;
        return regex.test(name);
    };

    const validatePhone = (phone) => {
        const regex = /^\d{10}$/;
        return regex.test(phone);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[!@#])[A-Za-z\d!@#]{1,8}$/;
        return regex.test(password);
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateFullName(fullName.value)) {
            alert('Nombre completo no válido. Debe contener solo letras y espacios, y tener entre 2 y 50 caracteres.');
            return;
        }

        if (!validatePhone(phone.value)) {
            alert('Número de teléfono no válido. Debe contener exactamente 10 dígitos.');
            return;
        }

        if (!validateEmail(email.value)) {
            alert('Email no válido.');
            return;
        }

        if (!validatePassword(password.value)) {
            alert('Contraseña no válida. Debe tener un máximo de 8 caracteres e incluir al menos un número y un carácter especial (!@#).');
            return;
        }

        if (password.value !== confirmPassword.value) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        const user = {
            fullName: fullName.value,
            phone: phone.value,
            email: email.value,
            password: password.value
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Cuenta creada exitosamente.');
        form.reset();
    });
});
