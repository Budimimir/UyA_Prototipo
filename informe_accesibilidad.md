# Informe de Accesibilidad (Nivel AA)
**Proyecto:** Prototipo Web para Reserva de Taxis
**Enfoque:** Frontend (HTML5, CSS3, JavaScript Vanilla, Bootstrap 5)


## 1. Navbar de Bootstrap (Navegación Global)

### Técnica Aplicada
Se emplea el componente `navbar` de Bootstrap 5, complementado con atributos ARIA (`aria-label`, `aria-expanded`, `aria-controls`, `aria-current`) y roles semánticos. El botón hamburguesa actualiza dinámicamente `aria-expanded` y anuncia cambios mediante una región `aria-live` para lectores de pantalla.

### Ilustración con Código
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary" aria-label="Navegación principal">
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Abrir menú de navegación">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav ms-auto">
			<li class="nav-item">
				<a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
			</li>
			...
		</ul>
	</div>
</nav>
```

### Gestión de Estado mediante JavaScript
Al abrir/cerrar el menú móvil, se actualiza `aria-expanded` y se anuncia el estado:
```js
navbarCollapse.addEventListener('shown.bs.collapse', () => {
	navbarToggler.setAttribute('aria-expanded', 'true');
	announceToScreenReader('Menú de navegación expandido');
});
navbarCollapse.addEventListener('hidden.bs.collapse', () => {
	navbarToggler.setAttribute('aria-expanded', 'false');
	announceToScreenReader('Menú de navegación contraído');
});
```

### Adaptación Bootstrap
- Se añade `aria-label` al `<nav>` y `aria-current` al enlace activo.
- Se implementa región `aria-live` para feedback accesible.


## 2. Formulario de Reserva

### Técnica Aplicada
Se utilizan etiquetas `<label>` asociadas, campos obligatorios con `aria-required`, descripciones con `aria-describedby` y agrupaciones con `<fieldset>` y `<legend>`. El formulario valida en cliente y muestra mensajes accesibles en una región `aria-live`.

### Ilustración con Código
```html
<form id="booking-form" novalidate aria-label="Formulario de solicitud de reserva">
	<fieldset>
		<legend>Detalles del Viaje</legend>
		<label for="origen">Lugar de Origen *</label>
		<select id="origen" name="origen" required aria-required="true">...</select>
		<label for="destino">Lugar de Destino *</label>
		<input id="destino" name="destino" required aria-required="true" aria-describedby="destino-help">
		<div id="destino-help">Indica el nombre del hotel...</div>
		...
	</fieldset>
</form>
```

### Gestión de Estado mediante JavaScript
Al enviar el formulario, se valida y se anuncia el resultado:
```js
bookingForm.addEventListener('submit', function(e) {
	e.preventDefault();
	if (valid) {
		announceToScreenReader('Reserva realizada con éxito.');
		showFormStatus(bookingForm, 'Reserva realizada con éxito.', true);
	} else {
		announceToScreenReader(errorMsg);
		showFormStatus(bookingForm, errorMsg, false);
	}
});
```

### Adaptación Bootstrap
- Se usa `.form-label`, `.form-control` y `.invalid-feedback`.
- Se asegura contraste y foco visible vía CSS personalizado.


## 3. Formulario de Gestión de Reservas

### Técnica Aplicada
Formulario con campos obligatorios, etiquetas asociadas y ayuda contextual. El resultado se muestra en una región `aria-live` para feedback inmediato.

### Ilustración con Código
```html
<form id="manage-form" novalidate aria-label="Formulario para buscar reserva existente">
	<label for="codigo_reserva">Código de Reserva *</label>
	<input id="codigo_reserva" name="codigo_reserva" required aria-required="true">
	<label for="email_reserva">Correo Electrónico *</label>
	<input id="email_reserva" name="email_reserva" required aria-required="true">
	<button type="submit">Buscar Reserva</button>
</form>
<div id="resultado-reserva" aria-live="polite" aria-atomic="true"></div>
```

### Gestión de Estado mediante JavaScript
Al enviar, se valida y se anuncia el resultado:
```js
manageForm.addEventListener('submit', function(e) {
	e.preventDefault();
	if (valid) {
		announceToScreenReader('Reserva encontrada. Mostrando detalles.');
		showFormStatus(manageForm, 'Reserva encontrada. Mostrando detalles.', true);
	} else {
		announceToScreenReader(errorMsg);
		showFormStatus(manageForm, errorMsg, false);
	}
});
```

### Adaptación Bootstrap
- Se usa `.form-label`, `.form-control` y ayuda visual.
- Región de resultado con `aria-live` para accesibilidad.


## 4. Carrusel / Componente Visual (Hero Section)

### Técnica Aplicada
Se utiliza una sección `<section>` con encabezado `<h1>` y botón con `aria-label` para navegación accesible. Si se usara carrusel, se añadirían roles y controles ARIA.

### Ilustración con Código
```html
<section class="bg-light py-5 border-bottom">
	<div class="container text-center">
		<h1 class="display-4 fw-bold mb-4">Traslados desde el Aeropuerto de Tenerife Sur</h1>
		<a href="booking.html" class="btn btn-primary btn-lg px-4 me-sm-3" aria-label="Ir al formulario para reservar tu traslado ahora">Reserva tu traslado ahora</a>
	</div>
</section>
```

### Gestión de Estado mediante JavaScript
No requiere JS específico, pero si se implementa carrusel, se debe actualizar el slide activo y anunciar cambios con `aria-live`.

### Adaptación Bootstrap
- Se asegura contraste, foco visible y uso de roles/ARIA si se usa carrusel.

## 5. Pruebas y Verificación de Accesibilidad Extendida

### 5.1 Validación de campos y escenarios
Se han realizado pruebas manuales en el formulario de reserva para los siguientes escenarios:
- Todos los campos vacíos: se muestra mensaje de error accesible y se indica el campo faltante.
- Email con formato incorrecto: mensaje de error accesible y foco en el campo.
- Teléfono con menos de 9 o más de 15 dígitos: error accesible.
- Destino fuera de Tenerife, Adeje o Arona: error accesible y no permite enviar.
- Número de pasajeros fuera de rango: error accesible.
- Todos los campos correctos: mensaje de éxito accesible y formulario se resetea.

### 5.2 Accesibilidad de mensajes de error y éxito
Los mensajes de error y éxito cumplen:
- Región `aria-live` con `assertive` para feedback inmediato.
- Contraste de color suficiente (rojo para error, verde para éxito, fondos diferenciados).
- El foco se mueve automáticamente al mensaje para usuarios de lector de pantalla.

### 5.3 Resultados
Todos los escenarios probados cumplen con los criterios de accesibilidad AA definidos en las especificaciones. El formulario es usable con teclado, los mensajes son anunciados correctamente y el diseño visual respeta el contraste y la visibilidad del foco.