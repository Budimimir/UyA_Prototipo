// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del menú de navegación (Hamburguesa Bootstrap) para actualizar atributos ARIA.
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');

    if (navbarToggler && navbarCollapse) {
        navbarCollapse.addEventListener('shown.bs.collapse', () => {
            navbarToggler.setAttribute('aria-expanded', 'true');
            // Anunciar al lector de pantallas (opcional, pero útil)
            announceToScreenReader('Menú de navegación expandido');
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            navbarToggler.setAttribute('aria-expanded', 'false');
            announceToScreenReader('Menú de navegación contraído');
        });
    }

    // 2. Función de utilidad para crear una región Live (aria-live) y anunciar cambios
    function announceToScreenReader(message) {
        let announcer = document.getElementById('aria-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'aria-announcer';
            announcer.setAttribute('aria-live', 'polite');
            // Hacerlo visualmente oculto pero accesible al lector
            announcer.style.position = 'absolute';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.padding = '0';
            announcer.style.margin = '-1px';
            announcer.style.overflow = 'hidden';
            announcer.style.clip = 'rect(0,0,0,0)';
            announcer.style.border = '0';
            document.body.appendChild(announcer);
        }
        announcer.textContent = message;
    }
    // 3. Simulación de envío de formularios accesible (booking.html y manage-booking.html)
    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validación de campos obligatorios y formato
            const nombre = bookingForm.nombre.value.trim();
            const email = bookingForm.email.value.trim();
            const telefono = bookingForm.telefono.value.trim();
            const origen = bookingForm.origen.value;
            const destino = bookingForm.destino.value.trim();
            const fecha = bookingForm.fecha.value;
            const pasajeros = bookingForm.pasajeros.value;
            let valid = true;
            let errorMsg = '';
            // Validación de nombre
            if (!nombre) {
                valid = false;
                errorMsg = 'El nombre es obligatorio.';
                bookingForm.nombre.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.nombre.removeAttribute('aria-invalid');
            }
            // Validación de email
            if (valid && (!email || !/^\S+@\S+\.\S+$/.test(email))) {
                valid = false;
                errorMsg = 'Introduce un correo electrónico válido.';
                bookingForm.email.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.email.removeAttribute('aria-invalid');
            }
            // Validación de teléfono
            if (valid && (!telefono || !/^\d{9,15}$/.test(telefono))) {
                valid = false;
                errorMsg = 'Introduce un teléfono válido (solo dígitos, 9-15 números).';
                bookingForm.telefono.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.telefono.removeAttribute('aria-invalid');
            }
            // Validación de origen
            if (valid && !origen) {
                valid = false;
                errorMsg = 'Selecciona el lugar de origen.';
                bookingForm.origen.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.origen.removeAttribute('aria-invalid');
            }
            // Validación de destino
            if (valid && !destino) {
                valid = false;
                errorMsg = 'El destino es obligatorio.';
                bookingForm.destino.setAttribute('aria-invalid', 'true');
            } else if (valid) {
                // Validación geográfica básica: solo destinos en Tenerife, Adeje, Arona
                const destinoValido = /(tenerife|adeje|arona)/i.test(destino);
                if (!destinoValido) {
                    valid = false;
                    errorMsg = 'Solo se permiten destinos en Tenerife, Adeje o Arona.';
                    bookingForm.destino.setAttribute('aria-invalid', 'true');
                } else {
                    bookingForm.destino.removeAttribute('aria-invalid');
                }
            } else {
                bookingForm.destino.removeAttribute('aria-invalid');
            }
            // Validación de fecha
            if (valid && !fecha) {
                valid = false;
                errorMsg = 'Selecciona la fecha del traslado.';
                bookingForm.fecha.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.fecha.removeAttribute('aria-invalid');
            }
            // Validación de pasajeros
            if (valid && (!pasajeros || pasajeros < 1 || pasajeros > 8)) {
                valid = false;
                errorMsg = 'El número de pasajeros debe estar entre 1 y 8.';
                bookingForm.pasajeros.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.pasajeros.removeAttribute('aria-invalid');
            }
            if (valid) {
                announceToScreenReader('Reserva realizada con éxito. Recibirás un correo de confirmación.');
                showFormStatus(bookingForm, 'Reserva realizada con éxito. Recibirás un correo de confirmación.', true);
                bookingForm.reset();
            } else {
                announceToScreenReader(errorMsg);
                showFormStatus(bookingForm, errorMsg, false);
            }
        });
    }

    // Manage Booking Form
    const manageForm = document.getElementById('manage-form');
    if (manageForm) {
        manageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const codigo = manageForm.codigo_reserva.value;
            const email = manageForm.email_reserva.value;
            let valid = true;
            let errorMsg = '';
            if (!codigo || !email) {
                valid = false;
                errorMsg = 'Introduce el código de reserva y el correo electrónico.';
            }
            if (valid) {
                announceToScreenReader('Reserva encontrada. Mostrando detalles.');
                showFormStatus(manageForm, 'Reserva encontrada. Mostrando detalles.', true);
                manageForm.reset();
            } else {
                announceToScreenReader(errorMsg);
                showFormStatus(manageForm, errorMsg, false);
            }
        });
    }

    // Utilidad para mostrar mensajes accesibles en el formulario
    function showFormStatus(form, message, success) {
        let status = form.querySelector('.form-status');
        if (!status) {
            status = document.createElement('div');
            status.className = 'form-status mt-3';
            status.setAttribute('aria-live', 'assertive');
            status.setAttribute('tabindex', '-1');
            form.appendChild(status);
        }
        status.textContent = message;
        status.style.color = success ? '#198754' : '#dc3545'; // Verde Bootstrap para éxito
        status.style.backgroundColor = success ? '#e9fbe8' : '#f8d7da';
        status.style.padding = '0.5em 1em';
        status.style.borderRadius = '0.25em';
        status.style.marginTop = '1em';
        // Mover el foco al mensaje para accesibilidad
        status.focus();
    }

    // 4. Verificación de foco visible en todos los elementos interactivos
    // (El CSS ya lo implementa, aquí solo se puede forzar un focus para demo)
    // document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
    //     el.addEventListener('focus', () => {
    //         // El outline se muestra por CSS :focus-visible
    //     });
    // });
});