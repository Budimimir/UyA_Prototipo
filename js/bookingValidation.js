// bookingValidation.js
// Lógica de validación aislada para el formulario de reserva

/**
 * Valida los datos del formulario de reserva.
 * @param {Object} data - Datos del formulario
 * @returns {Object} { valid: boolean, errorMsg: string|null, invalidField: string|null }
 */
function validateBookingForm(data) {
    if (!data.nombre || data.nombre.trim() === "") {
        return { valid: false, errorMsg: "El nombre es obligatorio.", invalidField: "nombre" };
    }
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
        return { valid: false, errorMsg: "Introduce un correo electrónico válido.", invalidField: "email" };
    }
    if (!data.telefono || !/^\d{9,15}$/.test(data.telefono)) {
        return { valid: false, errorMsg: "Introduce un teléfono válido (solo dígitos, 9-15 números).", invalidField: "telefono" };
    }
    if (!data.origen) {
        return { valid: false, errorMsg: "Selecciona el lugar de origen.", invalidField: "origen" };
    }
    if (!data.destino || data.destino.trim() === "") {
        return { valid: false, errorMsg: "El destino es obligatorio.", invalidField: "destino" };
    }
    if (!/(tenerife|adeje|arona)/i.test(data.destino)) {
        return { valid: false, errorMsg: "Solo se permiten destinos en Tenerife, Adeje o Arona.", invalidField: "destino" };
    }
    if (!data.fecha) {
        return { valid: false, errorMsg: "Selecciona la fecha del traslado.", invalidField: "fecha" };
    }
    if (!data.pasajeros || data.pasajeros < 1 || data.pasajeros > 8) {
        return { valid: false, errorMsg: "El número de pasajeros debe estar entre 1 y 8.", invalidField: "pasajeros" };
    }
    return { valid: true, errorMsg: null, invalidField: null };
}

module.exports = { validateBookingForm };
