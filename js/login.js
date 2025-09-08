document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // evitar envío del formulario

    const rutInput = document.getElementById('rutInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();
    const rutError = document.getElementById('rutError');
    const passwordError = document.getElementById('passwordError');

    // Limpiar errores anteriores
    rutError.textContent = '';
    passwordError.textContent = '';

    // Función para validar RUT usando módulo 11
    function validarRut(rutCompleto) {
        let rut = rutCompleto.replace(/\./g, '').replace('-', '');
        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1).toUpperCase();

        if (!/^\d+$/.test(cuerpo)) return false;

        let suma = 0;
        let multiplo = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo[i]) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }

        let dvEsperado = 11 - (suma % 11);
        if (dvEsperado === 11) dvEsperado = '0';
        else if (dvEsperado === 10) dvEsperado = 'K';
        else dvEsperado = dvEsperado.toString();

        return dv === dvEsperado;
    }

    // Validaciones
    if (!validarRut(rutInput)) {
        rutError.textContent = "RUT inválido";
        return;
    }

    if (!(rutInput === '21867698-7' && passwordInput === 'admin')) {
        passwordError.textContent = "Usuario o contraseña incorrectos";
        return;
    }

    // Si todo es correcto
    alert("Inicio de sesión correcto");
    window.location.href = 'index.html';
});