document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const rut = document.getElementById('InputRut').value.trim();
    const nombre = document.getElementById('InputNombre').value.trim();
    const fecha = document.getElementById('InputFecha').value;
    const telefono = document.getElementById('InputTelefono').value.trim();
    const email = document.getElementById('InputEmail').value.trim();
    const confirmarEmail = document.getElementById('InputConfirmarEmail').value.trim();
    const contraseña = document.getElementById('InputContraseña').value;
    const confirmarContraseña = document.getElementById('InputConfirmarContraseña').value;
    const terminos = document.getElementById('InputTerminos').checked;

    const errores = {
        ErrorRut: document.getElementById('ErrorRut'),
        ErrorNombre: document.getElementById('ErrorNombre'),
        ErrorFecha: document.getElementById('ErrorFecha'),
        ErrorTelefono: document.getElementById('ErrorTelefono'),
        ErrorEmail: document.getElementById('ErrorEmail'),
        ErrorConfirmarEmail: document.getElementById('ErrorConfirmarEmail'),
        ErrorContraseña: document.getElementById('ErrorContraseña'),
        ErrorConfirmarContraseña: document.getElementById('ErrorConfirmarContraseña'),
        ErrorTerminos: document.getElementById('ErrorTerminos')
    };

    for (let key in errores) {
        errores[key].textContent = '';
    }

    function validarRut(rutCompleto) {
        let rutLimpio = rutCompleto.replace(/\./g,'').replace('-','');
        let cuerpo = rutLimpio.slice(0,-1);
        let dv = rutLimpio.slice(-1).toUpperCase();

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

    let valido = true;

    if (!validarRut(rut)) {
        errores.ErrorRut.textContent = "RUT inválido";
        valido = false;
    }

    if (nombre.length < 3) {
        errores.ErrorNombre.textContent = "Ingresa un nombre válido";
        valido = false;
    }

    if (!fecha) {
        errores.ErrorFecha.textContent = "Ingresa tu fecha de nacimiento";
        valido = false;
    } else {
        let FechaNac = new Date(fecha);
        let hoy = new Date();
        let edad = hoy.getFullYear() - FechaNac.getFullYear();
        if (edad < 18 || (edad === 18 && hoy < new Date(FechaNac.setFullYear(FechaNac.getFullYear() + 18)))) {
            errores.ErrorFecha.textContent = "Debes ser mayor de 18 años";
            valido = false;
        }
    }

    if (!/^\+?\d{7,15}$/.test(telefono.replace(/\s+/g, ''))) {
        errores.ErrorTelefono.textContent = "Número de teléfono inválido";
        valido = false;
    }

    if (!email.includes('@')) {
        errores.ErrorEmail.textContent = "Correo inválido";
        valido = false;
    }

    if (email !== confirmarEmail) {
        errores.ErrorConfirmarEmail.textContent = "Los correos no coinciden";
        valido = false;
    }

    if (contraseña.length < 6) {
        errores.ErrorContraseña.textContent = "La contraseña debe tener al menos 6 caracteres";
        valido = false;
    }

    if (contraseña !== confirmarContraseña) {
        errores.ErrorConfirmarContraseña.textContent = "Las contraseñas no coinciden";
        valido = false;
    }

    if (!terminos) {
        errores.ErrorTerminos.textContent = "Debes aceptar los términos y condiciones";
        valido = false;
    }

    if (valido) {
        alert("Registro exitoso");
        window.location.href = 'login.html';
    }
});
