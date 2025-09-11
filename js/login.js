document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const rut = document.getElementById('InputRut').value.trim();
    const contraseña = document.getElementById('InputContraseña').value.trim();
    const errorRut = document.getElementById('ErrorRut');
    const errorContraseña = document.getElementById('ErrorContraseña');

    errorRut.textContent = '';
    errorContraseña.textContent = '';

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

    if (!validarRut(rut)) {
        errorRut.textContent = "RUT inválido";
        return;
    }

    //USUARIO PRUEBA

    if (!(rut === '21867698-7' && contraseña === 'admin')) {
        errorContraseña.textContent = "Usuario o contraseña incorrectos";
        return;
    }

    alert("Inicio de sesión correcto");
    window.location.href = 'index.html';
});