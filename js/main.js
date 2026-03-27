// main.js
// Script principal del proyecto:
// - Gestiona anuncios accesibles para lectores de pantalla.
// - Valida formularios de reserva y consulta.
// - Muestra mensajes de estado con foco programático.

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del menú responsive de Bootstrap.
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');

    // Sincroniza aria-expanded con el estado real del menú colapsable.
    if (navbarToggler && navbarCollapse) {
        navbarCollapse.addEventListener('shown.bs.collapse', () => {
            navbarToggler.setAttribute('aria-expanded', 'true');
            announceToScreenReader('Menú de navegación expandido');
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            navbarToggler.setAttribute('aria-expanded', 'false');
            announceToScreenReader('Menú de navegación contraído');
        });
    }

    // Crea (si no existe) una región aria-live para anunciar cambios no visuales.
    function announceToScreenReader(message) {
        let announcer = document.getElementById('aria-announcer');

        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'aria-announcer';
            announcer.setAttribute('aria-live', 'polite');

            // Oculta visualmente el nodo sin retirarlo del árbol de accesibilidad.
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

    // Formulario de reserva (booking.html).
    // Se valida secuencialmente y se detiene en el primer error detectado.
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombre = bookingForm.nombre.value.trim();
            const email = bookingForm.email.value.trim();
            const telefono = bookingForm.telefono.value.trim();
            const origen = bookingForm.origen.value;
            const destino = bookingForm.destino.value.trim();
            const fecha = bookingForm.fecha.value;
            const pasajeros = bookingForm.pasajeros.value;

            let valid = true;
            let errorMsg = '';

            if (!nombre) {
                valid = false;
                errorMsg = 'El nombre es obligatorio.';
                bookingForm.nombre.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.nombre.removeAttribute('aria-invalid');
            }

            if (valid && (!email || !/^\S+@\S+\.\S+$/.test(email))) {
                valid = false;
                errorMsg = 'Introduce un correo electrónico válido.';
                bookingForm.email.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.email.removeAttribute('aria-invalid');
            }

            if (valid && (!telefono || !/^\d{9,15}$/.test(telefono))) {
                valid = false;
                errorMsg = 'Introduce un teléfono válido (solo dígitos, 9-15 números).';
                bookingForm.telefono.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.telefono.removeAttribute('aria-invalid');
            }

            if (valid && !origen) {
                valid = false;
                errorMsg = 'Selecciona el lugar de origen.';
                bookingForm.origen.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.origen.removeAttribute('aria-invalid');
            }

            if (valid && !destino) {
                valid = false;
                errorMsg = 'El destino es obligatorio.';
                bookingForm.destino.setAttribute('aria-invalid', 'true');
            } else if (valid) {
                // Regla de negocio simplificada: solo ciertas zonas permitidas.
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

            if (valid && !fecha) {
                valid = false;
                errorMsg = 'Selecciona la fecha del traslado.';
                bookingForm.fecha.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.fecha.removeAttribute('aria-invalid');
            }

            if (valid && (!pasajeros || pasajeros < 1 || pasajeros > 8)) {
                valid = false;
                errorMsg = 'El número de pasajeros debe estar entre 1 y 8.';
                bookingForm.pasajeros.setAttribute('aria-invalid', 'true');
            } else {
                bookingForm.pasajeros.removeAttribute('aria-invalid');
            }

            if (valid) {
                const successMsg = 'Reserva realizada con éxito. Recibirás un correo de confirmación.';
                announceToScreenReader(successMsg);
                showFormStatus(bookingForm, successMsg, true);
                bookingForm.reset();
                return;
            }

            announceToScreenReader(errorMsg);
            showFormStatus(bookingForm, errorMsg, false);
        });
    }

    // Formulario de gestión de reservas (manage-booking.html).
    // Valida presencia de código y email antes de simular búsqueda.
    const manageForm = document.getElementById('manage-form');
    if (manageForm) {
        manageForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const codigo = manageForm.codigo_reserva.value;
            const email = manageForm.email_reserva.value;
            let valid = true;
            let errorMsg = '';

            if (!codigo || !email) {
                valid = false;
                errorMsg = 'Introduce el código de reserva y el correo electrónico.';
            }

            if (valid) {
                const successMsg = 'Reserva encontrada. Mostrando detalles.';
                announceToScreenReader(successMsg);
                showFormStatus(manageForm, successMsg, true);
                manageForm.reset();
                return;
            }

            announceToScreenReader(errorMsg);
            showFormStatus(manageForm, errorMsg, false);
        });
    }

    // Inserta o reutiliza un contenedor de estado dentro del formulario.
    // Además, mueve el foco al mensaje para lectura inmediata por teclado/lector.
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
        status.style.color = success ? '#198754' : '#dc3545';
        status.style.backgroundColor = success ? '#e9fbe8' : '#f8d7da';
        status.style.padding = '0.5em 1em';
        status.style.borderRadius = '0.25em';
        status.style.marginTop = '1em';
        status.focus();
    }
});