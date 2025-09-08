document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Inputs
    const rut = document.getElementById('rutInput').value.trim();
    const name = document.getElementById('exampleInputName1').value.trim();
    const birth = document.getElementById('birthdateInput').value;
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('exampleInputEmail1').value.trim();
    const confirmEmail = document.getElementById('confirmEmailInput').value.trim();
    const password = document.getElementById('exampleInputPassword1').value;
    const confirmPassword = document.getElementById('confirmPasswordInput').value;
    const terms = document.getElementById('exampleCheck1').checked;

    // Errores
    const errors = {
        rutError: document.getElementById('rutError'),
        nameError: document.getElementById('nameError'),
        birthError: document.getElementById('birthError'),
        phoneError: document.getElementById('phoneError'),
        emailError: document.getElementById('emailError'),
        confirmEmailError: document.getElementById('confirmEmailError'),
        passwordError: document.getElementById('passwordError'),
        confirmPasswordError: document.getElementById('confirmPasswordError'),
        termsError: document.getElementById('termsError')
    };

    // Limpiar errores
    for (let key in errors) {
        errors[key].textContent = '';
    }

    // Validar RUT
    function validarRut(rutCompleto) {
        let rutClean = rutCompleto.replace(/\./g,'').replace('-','');
        let cuerpo = rutClean.slice(0,-1);
        let dv = rutClean.slice(-1).toUpperCase();

        if (!/^\d+$/.test(cuerpo)) return false;

        let suma = 0;
        let multiplo = 2;

        for (let i = cuerpo.length - 1; i >=0; i--) {
            suma += parseInt(cuerpo[i]) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }

        let dvEsperado = 11 - (suma % 11);
        if (dvEsperado === 11) dvEsperado = '0';
        else if (dvEsperado === 10) dvEsperado = 'K';
        else dvEsperado = dvEsperado.toString();

        return dv === dvEsperado;
    }

    let valid = true;

    if (!validarRut(rut)) {
        errors.rutError.textContent = "RUT inválido";
        valid = false;
    }

    if (name.length < 3) {
        errors.nameError.textContent = "Ingresa un nombre válido";
        valid = false;
    }

    if (!birth) {
        errors.birthError.textContent = "Ingresa tu fecha de nacimiento";
        valid = false;
    } else {
        let birthDate = new Date(birth);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || (age === 18 && today < new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)))) {
            errors.birthError.textContent = "Debes ser mayor de 18 años";
            valid = false;
        }
    }

    if (!/^\+?\d{7,15}$/.test(phone.replace(/\s+/g, ''))) {
        errors.phoneError.textContent = "Número de teléfono inválido";
        valid = false;
    }

    if (!email.includes('@')) {
        errors.emailError.textContent = "Correo inválido";
        valid = false;
    }

    if (email !== confirmEmail) {
        errors.confirmEmailError.textContent = "Los correos no coinciden";
        valid = false;
    }

    if (password.length < 6) {
        errors.passwordError.textContent = "La contraseña debe tener al menos 6 caracteres";
        valid = false;
    }

    if (password !== confirmPassword) {
        errors.confirmPasswordError.textContent = "Las contraseñas no coinciden";
        valid = false;
    }

    if (!terms) {
        errors.termsError.textContent = "Debes aceptar los términos y condiciones";
        valid = false;
    }

    if (valid) {
        alert("Registro exitoso");
        window.location.href = 'login.html';
    }
});
