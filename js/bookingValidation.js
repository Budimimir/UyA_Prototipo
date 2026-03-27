
// bookingValidation.js
// Módulo de validación aislada para el formulario de reserva.
// Se exporta para reutilización y para pruebas unitarias con Jest.

/**
 * Valida los datos del formulario de reserva.
 * Comprueba nombre, email, teléfono, origen, destino, fecha y número de pasajeros.
 * Devuelve un objeto con el estado de validez, mensaje de error y campo inválido si aplica.
 * @param {Object} data - Datos del formulario
 * @returns {Object} { valid: boolean, errorMsg: string|null, invalidField: string|null }
 */
function validateBookingForm(data) {
    // 1) Nombre obligatorio para identificar al titular de la reserva.
    if (!data.nombre || data.nombre.trim() === "") {
        return { valid: false, errorMsg: "El nombre es obligatorio.", invalidField: "nombre" };
    }

    // 2) Email obligatorio con patrón básico nombre@dominio.ext
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
        return { valid: false, errorMsg: "Introduce un correo electrónico válido.", invalidField: "email" };
    }

    // 3) Teléfono: solo dígitos, longitud mínima 9 y máxima 15.
    if (!data.telefono || !/^\d{9,15}$/.test(data.telefono)) {
        return { valid: false, errorMsg: "Introduce un teléfono válido (solo dígitos, 9-15 números).", invalidField: "telefono" };
    }

    // 4) Origen obligatorio (aeropuerto o punto configurado).
    if (!data.origen) {
        return { valid: false, errorMsg: "Selecciona el lugar de origen.", invalidField: "origen" };
    }

    // 5) Destino obligatorio y restringido a zonas soportadas por el servicio.
    if (!data.destino || data.destino.trim() === "") {
        return { valid: false, errorMsg: "El destino es obligatorio.", invalidField: "destino" };
    }
    if (!/(tenerife|adeje|arona)/i.test(data.destino)) {
        return { valid: false, errorMsg: "Solo se permiten destinos en Tenerife, Adeje o Arona.", invalidField: "destino" };
    }

    // 6) Fecha obligatoria para poder planificar el traslado.
    if (!data.fecha) {
        return { valid: false, errorMsg: "Selecciona la fecha del traslado.", invalidField: "fecha" };
    }

    // 7) Número de pasajeros dentro de la capacidad permitida (1 a 8).
    if (!data.pasajeros || data.pasajeros < 1 || data.pasajeros > 8) {
        return { valid: false, errorMsg: "El número de pasajeros debe estar entre 1 y 8.", invalidField: "pasajeros" };
    }

    // Si supera todas las comprobaciones, el formulario se considera válido.
    return { valid: true, errorMsg: null, invalidField: null };
}

// Export CommonJS para consumo en tests y otros módulos del proyecto.
module.exports = { validateBookingForm };
