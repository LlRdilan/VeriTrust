document.getElementById("compraForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const numero = document.getElementById("numeroTarjeta").value.trim();
    const mes = document.getElementById("mesExp").value.trim();
    const anno = document.getElementById("anoExp").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    mensajeError.textContent = "";

    // Usar Luhn (Modulo 10) para validar tarjeta
    // Pasos del Modulo 10:
    // 1. Desde el último dígito, mover hacia la izquierda, duplicar el valor de cada segundo dígito.
    // 2. Si el resultado de esta duplicación es mayor que 9, restar 9.
    // 3. Sumar todos los dígitos.
    // 4. Si el total es múltiplo de 10, la tarjeta es válida.
    function validarTarjeta(numero) {
        let suma = 0;
        let doble = false;
        for (let i = numero.length - 1; i >= 0; i--) {
            let digito = parseInt(numero.charAt(i), 10);
            if (doble) {
                digito *= 2;
                if (digito > 9) digito -= 9;
            }
            suma += digito;
            doble = !doble;
        }
        return (suma % 10) === 0;
    }

    if (!/^\d{16}$/.test(numero) || !validarTarjeta(numero)) {
        mensajeError.textContent = "Número de tarjeta inválido";
        return;
    }

    if (!/^\d{2}$/.test(mes) || parseInt(mes) < 1 || parseInt(mes) > 12) {
        mensajeError.textContent = "Mes de expiración inválido";
        return;
    }

    const AñoActual = new Date().getFullYear();
    if (!/^\d{4}$/.test(anno) || parseInt(anno) < AñoActual) {
        mensajeError.textContent = "Año de expiración inválido";
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        mensajeError.textContent = "CVV inválido";
        return;
    }

    alert("Compra realizada con éxito!");
    this.reset();
});
