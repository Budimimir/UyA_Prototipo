
// bookingValidation.js
// Lógica de validación aislada para el formulario de reserva

/**
 * Valida los datos del formulario de reserva.
 * Comprueba nombre, email, teléfono, origen, destino, fecha y número de pasajeros.
 * Devuelve un objeto con el estado de validez, mensaje de error y campo inválido si aplica.
 * @param {Object} data - Datos del formulario
 * @returns {Object} { valid: boolean, errorMsg: string|null, invalidField: string|null }
 */
function validateBookingForm(data) {
    // Validar nombre (obligatorio)
    if (!data.nombre || data.nombre.trim() === "") {
        return { valid: false, errorMsg: "El nombre es obligatorio.", invalidField: "nombre" };
    }
    // Validar email (formato básico)
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
        return { valid: false, errorMsg: "Introduce un correo electrónico válido.", invalidField: "email" };
    }
    // Validar teléfono (solo dígitos, 9-15 números)
    if (!data.telefono || !/^\d{9,15}$/.test(data.telefono)) {
        return { valid: false, errorMsg: "Introduce un teléfono válido (solo dígitos, 9-15 números).", invalidField: "telefono" };
    }
    // Validar origen (obligatorio)
    if (!data.origen) {
        return { valid: false, errorMsg: "Selecciona el lugar de origen.", invalidField: "origen" };
    }
    // Validar destino (obligatorio y geográfico)
    if (!data.destino || data.destino.trim() === "") {
        return { valid: false, errorMsg: "El destino es obligatorio.", invalidField: "destino" };
    }
    if (!/(tenerife|adeje|arona)/i.test(data.destino)) {
        return { valid: false, errorMsg: "Solo se permiten destinos en Tenerife, Adeje o Arona.", invalidField: "destino" };
    }
    // Validar fecha (obligatorio)
    if (!data.fecha) {
        return { valid: false, errorMsg: "Selecciona la fecha del traslado.", invalidField: "fecha" };
    }
    // Validar número de pasajeros (1-8)
    if (!data.pasajeros || data.pasajeros < 1 || data.pasajeros > 8) {
        return { valid: false, errorMsg: "El número de pasajeros debe estar entre 1 y 8.", invalidField: "pasajeros" };
    }
    // Si todo es válido
    return { valid: true, errorMsg: null, invalidField: null };
}

// Exportar la función para uso en otros módulos
module.exports = { validateBookingForm };
