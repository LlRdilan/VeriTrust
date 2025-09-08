document.getElementById("compraForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreTarjeta").value.trim();
    const numero = document.getElementById("numeroTarjeta").value.trim();
    const mes = document.getElementById("mesExp").value.trim();
    const ano = document.getElementById("anoExp").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    mensajeError.textContent = "";

    // Validar tarjeta con Luhn (número válido)
    function validarTarjeta(numero) {
        let sum = 0;
        let doubleUp = false;
        for (let i = numero.length - 1; i >= 0; i--) {
            let digit = parseInt(numero.charAt(i), 10);
            if (doubleUp) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            doubleUp = !doubleUp;
        }
        return (sum % 10) === 0;
    }

    if (!/^\d{16}$/.test(numero) || !validarTarjeta(numero)) {
        mensajeError.textContent = "Número de tarjeta inválido";
        return;
    }

    if (!/^\d{2}$/.test(mes) || parseInt(mes) < 1 || parseInt(mes) > 12) {
        mensajeError.textContent = "Mes de expiración inválido";
        return;
    }

    const currentYear = new Date().getFullYear();
    if (!/^\d{4}$/.test(ano) || parseInt(ano) < currentYear) {
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
