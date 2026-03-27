// bookingValidation.test.js
// Pruebas unitarias para la función validateBookingForm.
// Cada test verifica un caso de validación del formulario de reserva.

// Importamos la función a testear desde el módulo de validación
const { validateBookingForm } = require('./bookingValidation');

// Grupo de tests para validateBookingForm
describe('validateBookingForm', () => {
    // Test: formulario válido (todos los campos correctos)
    it('valida correctamente un formulario válido', () => {
        const data = {
            nombre: 'Juan Pérez',
            email: 'juan@email.com',
            telefono: '600123456',
            origen: 'TFS',
            destino: 'Hotel Tenerife',
            fecha: '2026-03-22',
            pasajeros: 2
        };
        // Espera que la validación sea exitosa
        expect(validateBookingForm(data)).toEqual({ valid: true, errorMsg: null, invalidField: null });
    });

    // Test: nombre vacío
    it('detecta nombre vacío', () => {
        const data = { ...base(), nombre: '' };
        // Espera error en el campo nombre
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'El nombre es obligatorio.', invalidField: 'nombre' });
    });

    // Test: email inválido
    it('detecta email inválido', () => {
        const data = { ...base(), email: 'juan@' };
        // Espera error en el campo email
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Introduce un correo electrónico válido.', invalidField: 'email' });
    });

    // Test: teléfono inválido
    it('detecta teléfono inválido', () => {
        const data = { ...base(), telefono: '123' };
        // Espera error en el campo teléfono
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Introduce un teléfono válido (solo dígitos, 9-15 números).', invalidField: 'telefono' });
    });

    // Test: origen vacío
    it('detecta origen vacío', () => {
        const data = { ...base(), origen: '' };
        // Espera error en el campo origen
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Selecciona el lugar de origen.', invalidField: 'origen' });
    });

    // Test: destino vacío
    it('detecta destino vacío', () => {
        const data = { ...base(), destino: '' };
        // Espera error en el campo destino
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'El destino es obligatorio.', invalidField: 'destino' });
    });

    // Test: destino fuera de zona permitida
    it('detecta destino fuera de zona', () => {
        const data = { ...base(), destino: 'Madrid' };
        // Espera error por destino no permitido
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Solo se permiten destinos en Tenerife, Adeje o Arona.', invalidField: 'destino' });
    });

    // Test: fecha vacía
    it('detecta fecha vacía', () => {
        const data = { ...base(), fecha: '' };
        // Espera error en el campo fecha
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Selecciona la fecha del traslado.', invalidField: 'fecha' });
    });

    // Test: pasajeros fuera de rango permitido
    it('detecta pasajeros fuera de rango', () => {
        const data = { ...base(), pasajeros: 0 };
        // Espera error por número de pasajeros inválido
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'El número de pasajeros debe estar entre 1 y 8.', invalidField: 'pasajeros' });
    });

    // Función auxiliar para obtener un objeto base válido
    function base() {
        return {
            nombre: 'Juan Pérez',
            email: 'juan@email.com',
            telefono: '600123456',
            origen: 'TFS',
            destino: 'Hotel Tenerife',
            fecha: '2026-03-22',
            pasajeros: 2
        };
    }
});
