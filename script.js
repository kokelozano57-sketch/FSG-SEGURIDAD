// ================================
// CONFIGURACIÓN DE CIUDADES Y ZONAS HORARIAS
// ================================

const citiesData = [
    { name: 'Nueva York', timezone: 'America/New_York', flag: '🇺🇸' },
    { name: 'Londres', timezone: 'Europe/London', flag: '🇬🇧' },
    { name: 'Tokio', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'Sídney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
    { name: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪' },
    { name: 'París', timezone: 'Europe/Paris', flag: '🇫🇷' },
    { name: 'Berlín', timezone: 'Europe/Berlin', flag: '🇩🇪' },
    { name: 'Toronto', timezone: 'America/Toronto', flag: '🇨🇦' },
    { name: 'Sao Paulo', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', flag: '🇭🇰' },
    { name: 'Singapur', timezone: 'Asia/Singapore', flag: '🇸🇬' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
    { name: 'Estambul', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
    { name: 'Ciudad de México', timezone: 'America/Mexico_City', flag: '🇲🇽' },
    { name: 'Moscú', timezone: 'Europe/Moscow', flag: '🇷🇺' },
    { name: 'Nueva Delhi', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
];

let selectedCities = [
    { name: 'Nueva York', timezone: 'America/New_York', flag: '🇺🇸' },
    { name: 'Londres', timezone: 'Europe/London', flag: '🇬🇧' },
    { name: 'Tokio', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
];

let timeFormat = '24';

// ================================
// ELEMENTOS DEL DOM
// ================================
const mainTime = document.getElementById('mainTime');
const mainDate = document.getElementById('mainDate');
const mainTimezone = document.getElementById('mainTimezone');
const clocksGrid = document.getElementById('clocksGrid');
const modal = document.getElementById('modal');
const addCityBtn = document.getElementById('addCityBtn');
const closeModal = document.querySelector('.modal-close');
const confirmAddCity = document.getElementById('confirmAddCity');
const cityInput = document.getElementById('cityInput');
const citySuggestions = document.getElementById('citySuggestions');
const searchCity = document.getElementById('searchCity');
const timezoneInfo = document.getElementById('timezoneInfo');
const formatBtns = document.querySelectorAll('.format-btn');

// ================================
// EVENT LISTENERS
// ================================
addCityBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    cityInput.focus();
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

cityInput.addEventListener('input', showSuggestions);
confirmAddCity.addEventListener('click', addCity);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addCity();
});

formatBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        formatBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        timeFormat = e.target.dataset.format;
    });
});

searchCity.addEventListener('input', filterCities);

// ================================
// FUNCIONES DE RELOJ
// ================================

function formatTime(date, is12h = false) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    if (is12h) {
        let hour12 = date.getHours();
        const ampm = hour12 >= 12 ? 'PM' : 'AM';
        hour12 = hour12 % 12;
        hour12 = hour12 ? hour12 : 12;
        return `${String(hour12).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    }

    return `${hours}:${minutes}:${seconds}`;
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function updateMainClock() {
    const now = new Date();
    const is12h = timeFormat === '12';

    mainTime.textContent = formatTime(now, is12h);
    mainDate.textContent = formatDate(now);
    mainTimezone.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function updateCityClock(city, index) {
    const formatter = new Intl.DateTimeFormat('es-ES', {
        timeZone: city.timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: timeFormat === '12'
    });

    const date = new Date();
    const parts = formatter.formatToParts(date);
    
    let timeStr = '';
    let dateStr = '';

    parts.forEach(part => {
        if (['hour', 'minute', 'second'].includes(part.type)) {
            timeStr += part.value + (part.type !== 'second' ? ':' : '');
        }
    });

    if (timeFormat === '12') {
        const localFormatter = new Intl.DateTimeFormat('es-ES', {
            timeZone: city.timezone,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        timeStr = localFormatter.format(new Date());
    }

    const dateFormatter = new Intl.DateTimeFormat('es-ES', {
        timeZone: city.timezone,
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    dateStr = dateFormatter.format(date);

    const clockCard = document.querySelector(`[data-city-index="${index}"]`);
    if (clockCard) {
        clockCard.querySelector('.clock-time').textContent = timeStr;
        clockCard.querySelector('.clock-date').textContent = dateStr;
    }
}

function renderClocks() {
    clocksGrid.innerHTML = '';
    
    selectedCities.forEach((city, index) => {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.setAttribute('data-city-index', index);
        
        const timeFormatter = new Intl.DateTimeFormat('es-ES', {
            timeZone: city.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: timeFormat === '12'
        });
        
        const dateFormatter = new Intl.DateTimeFormat('es-ES', {
            timeZone: city.timezone,
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const time = timeFormatter.format(new Date());
        const date = dateFormatter.format(new Date());

        card.innerHTML = `
            <div class="city-name"><span class="city-flag">${city.flag}</span>${city.name}</div>
            <div class="clock-time">${time}</div>
            <div class="clock-date">${date}</div>
            <div class="clock-timezone">${city.timezone}</div>
            <button class="btn-remove" onclick="removeCity(${index})">Eliminar</button>
        `;

        clocksGrid.appendChild(card);
    });
}

function showSuggestions() {
    const input = cityInput.value.toLowerCase();
    citySuggestions.innerHTML = '';

    if (input.length === 0) return;

    const filtered = citiesData.filter(city =>
        city.name.toLowerCase().includes(input) &&
        !selectedCities.some(s => s.name === city.name)
    );

    if (filtered.length === 0) {
        citySuggestions.textContent = 'No se encontraron ciudades.';
        return;
    }

    const suggestions = filtered.slice(0, 5).map(city => 
        `<span style="cursor: pointer; margin-right: 0.5rem; padding: 0.4rem 0.8rem; background: rgba(212,175,55,0.2); border-radius: 6px; display: inline-block; transition: all 0.3s; border: 1px solid rgba(212,175,55,0.4); font-weight: 500;" onclick="selectCitySuggestion('${city.name}', '${city.timezone}', '${city.flag}')">${city.flag} ${city.name}</span>`
    ).join('');

    citySuggestions.innerHTML = suggestions;
}

function selectCitySuggestion(name, timezone, flag) {
    cityInput.value = name;
    addCity();
}

function addCity() {
    const input = cityInput.value.toLowerCase();
    const found = citiesData.find(city => city.name.toLowerCase() === input);

    if (!found) {
        alert('Ciudad no encontrada. Por favor selecciona de las sugerencias.');
        return;
    }

    if (selectedCities.some(s => s.name === found.name)) {
        alert('Esta ciudad ya está agregada.');
        return;
    }

    selectedCities.push(found);
    cityInput.value = '';
    citySuggestions.innerHTML = '';
    modal.style.display = 'none';
    renderClocks();
}

function removeCity(index) {
    selectedCities.splice(index, 1);
    renderClocks();
}

function filterCities() {
    const searchTerm = searchCity.value.toLowerCase();
    document.querySelectorAll('.clock-card').forEach(card => {
        const cityName = card.querySelector('.city-name').textContent.toLowerCase();
        card.style.display = cityName.includes(searchTerm) ? '' : 'none';
    });
}

function displayTimezoneInfo() {
    timezoneInfo.innerHTML = '';
    const uniqueTimezones = [...new Set(selectedCities.map(c => c.timezone))];

    uniqueTimezones.forEach(tz => {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat('es-ES', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const card = document.createElement('div');
        card.className = 'timezone-card';
        card.innerHTML = `
            <strong>${tz}</strong>
            <span>${formatter.format(date)}</span>
        `;
        timezoneInfo.appendChild(card);
    });
}

// ================================
// LOOP DE ACTUALIZACIÓN
// ================================
function updateAllClocks() {
    updateMainClock();
    selectedCities.forEach((city, index) => {
        updateCityClock(city, index);
    });
    displayTimezoneInfo();
}

// Actualizar cada segundo
setInterval(updateAllClocks, 1000);

// Inicializar
renderClocks();
updateAllClocks();

console.log('%c🕐 Reloj Digital Premium 3D - Cargado exitosamente', 'color: #d4af37; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(212,175,55,0.6);');