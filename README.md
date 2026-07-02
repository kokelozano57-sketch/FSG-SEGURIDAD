# ⏰ Reloj Digital Global

Un reloj digital interactivo que muestra la hora en múltiples zonas horarias del mundo. Visualiza la hora actual en diferentes ciudades con un diseño moderno y responsivo.

## 🌟 Características

✨ **Reloj Principal** - Muestra la hora local del dispositivo
🌍 **Múltiples Zonas Horarias** - Visualiza ciudades de todo el mundo
➕ **Agregar/Eliminar Ciudades** - Personaliza tu lista de ciudades
🔄 **Actualización en Tiempo Real** - Se actualiza cada segundo
📱 **Responsive Design** - Funciona en móviles, tablets y escritorio
🎨 **Interfaz Futurista** - Colores vibrantes y animaciones suaves
🔍 **Buscar Ciudades** - Filtra y busca ciudades fácilmente
🕐 **Formato de Hora Flexible** - Cambia entre formato 24h y 12h (AM/PM)

## 🚀 Cómo Usar

### 1. Abrir la Página
- Descarga o clona el repositorio
- Abre el archivo `index.html` en tu navegador
- ¡Listo! El reloj comenzará a mostrar la hora

### 2. Agregar una Nueva Ciudad
1. Haz clic en el botón "➕ Agregar Ciudad"
2. Escribe el nombre de la ciudad en el modal
3. Selecciona de las sugerencias o escribe el nombre completo
4. Haz clic en "Agregar"

### 3. Cambiar Formato de Hora
- Usa el selector "Formato 24h" o "Formato 12h (AM/PM)" en los controles

### 4. Buscar Ciudades
- Usa la barra de búsqueda para filtrar las ciudades mostradas

### 5. Eliminar una Ciudad
- Haz clic en el botón "Eliminar" en la tarjeta de la ciudad

## 🏙️ Ciudades Disponibles

- 🇺🇸 Nueva York (America/New_York)
- 🇬🇧 Londres (Europe/London)
- 🇯🇵 Tokio (Asia/Tokyo)
- 🇦🇺 Sídney (Australia/Sydney)
- 🇦🇪 Dubai (Asia/Dubai)
- 🇫🇷 París (Europe/Paris)
- 🇩🇪 Berlín (Europe/Berlin)
- 🇨🇦 Toronto (America/Toronto)
- 🇧🇷 Sao Paulo (America/Sao_Paulo)
- 🇭🇰 Hong Kong (Asia/Hong_Kong)
- 🇸🇬 Singapur (Asia/Singapore)
- 🇹🇭 Bangkok (Asia/Bangkok)
- 🇹🇷 Estambul (Europe/Istanbul)
- 🇲🇽 Ciudad de México (America/Mexico_City)
- 🇷🇺 Moscú (Europe/Moscow)
- 🇮🇳 Nueva Delhi (Asia/Kolkata)

## 📁 Estructura de Archivos

```
digital-clock/
├── index.html       # Estructura HTML
├── styles.css       # Estilos y animaciones
├── script.js        # Lógica y funcionalidades
└── README.md        # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con gradientes y animaciones
- **JavaScript (ES6+)** - Lógica de zonas horarias
- **Intl API** - Para manejo de zonas horarias
- **Font Awesome** - Iconos

## 🎨 Diseño

### Colores
- Fondo: Gradiente azul oscuro a púrpura
- Texto Primario: Cian (#00d4ff)
- Texto Secundario: Rosa (#ec4899)
- Acento Verde: (#10b981)

### Animaciones
- Deslizamiento al cargar (slideDown, slideUp)
- Efectos de brillo en la hora (glow)
- Transiciones suaves en hover
- Animación de carga de tarjetas (slideIn)

## 💻 Compatibilidad

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Móviles (iOS/Android)

## 📝 Notas

- Las zonas horarias se calculan usando la API Intl de JavaScript
- El reloj se actualiza automáticamente cada segundo
- No requiere conexión a internet para funcionar (después de la carga inicial)
- Los datos de ciudades están almacenados localmente en el script

## 🔧 Personalización

Puedes agregar más ciudades editando el array `citiesData` en `script.js`:

```javascript
{ name: 'Tu Ciudad', timezone: 'Zona/Horaria', flag: '🏳️' }
```

## 📄 Licencia

Libre para usar y modificar.

---

**Creado con ❤️ usando HTML, CSS y JavaScript**