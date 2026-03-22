// bookingValidation.test.js
const { validateBookingForm } = require('./bookingValidation');

describe('validateBookingForm', () => {
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
        expect(validateBookingForm(data)).toEqual({ valid: true, errorMsg: null, invalidField: null });
    });

    it('detecta nombre vacío', () => {
        const data = { ...base(), nombre: '' };
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'El nombre es obligatorio.', invalidField: 'nombre' });
    });

    it('detecta email inválido', () => {
        const data = { ...base(), email: 'juan@' };
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Introduce un correo electrónico válido.', invalidField: 'email' });
    });

    it('detecta teléfono inválido', () => {
        const data = { ...base(), telefono: '123' };
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Introduce un teléfono válido (solo dígitos, 9-15 números).', invalidField: 'telefono' });
    });

    it('detecta origen vacío', () => {
        const data = { ...base(), origen: '' };
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Selecciona el lugar de origen.', invalidField: 'origen' });
    });

    it('detecta destino vacío', () => {
        const data = { ...base(), destino: '' };
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'El destino es obligatorio.', invalidField: 'destino' });
    });

    it('detecta destino fuera de zona', () => {
        const data = { ...base(), destino: 'Madrid' };
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Solo se permiten destinos en Tenerife, Adeje o Arona.', invalidField: 'destino' });
    });

    it('detecta fecha vacía', () => {
        const data = { ...base(), fecha: '' };
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Selecciona la fecha del traslado.', invalidField: 'fecha' });
    });

    it('detecta pasajeros fuera de rango', () => {
        const data = { ...base(), pasajeros: 0 };
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'El número de pasajeros debe estar entre 1 y 8.', invalidField: 'pasajeros' });
    });

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
