/* Animación Navbar */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", mobileMenu);

    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
}

/* Animacion trabajos************************************************************************* */
import datos from "./DB/index.js";

const trabajos = document.getElementById('trabajos');               // contenedor top
const ventanaTrabajos = document.getElementById('ventana-trabajos'); // contenedor top

if (trabajos && ventanaTrabajos) {
    trabajos.addEventListener('click', (event) => {
        event.preventDefault(); 
        console.log('currentarget', event.currentTarget); // muestra la jerarquia de todo el elemento
        console.log('target', event.target); // muestra solo el elemento clickado

        // busqueda hacia arriba en el DOM
        const trabajoClickeado = event.target.closest('.trabajos__trabajo'); // contenedor mas anidado dentro de trabajos__imagen, solo lo encontraremos si clicamos en este contenedor
        if (!trabajoClickeado) return;  // salir si no se clickeó un trabajo válido
        console.log('trabajoClickeado', trabajoClickeado); 

        const id = trabajoClickeado.dataset.id;
        if (!id) return;

        const trabajoFiltrado = datos.find(elem => elem.id == id);
        if (!trabajoFiltrado) {
            console.log('No se encontró un trabajo con ese ID');
            return;
        }

        const { title, fecha, texto, url1, url2 } = trabajoFiltrado;

        // Busqueda hacia abajo del elemento del DOM
        ventanaTrabajos.querySelector('.ventana__titulo').innerText = title;
        ventanaTrabajos.querySelector('.ventana__fecha').innerText = fecha;
        ventanaTrabajos.querySelector('.ventana__parrafo').innerText = texto;
        ventanaTrabajos.querySelector('.ventana__imagen').src = trabajoClickeado.querySelector('img').src;

        // Asignar URLs a los iconos
        ventanaTrabajos.querySelector('.icono-url1').href = url1;
        ventanaTrabajos.querySelector('.icono-url2').href = url2;

        ventanaTrabajos.classList.remove('modal__invisible');
    });

    const btnCerrar = document.querySelector('.ventana__btn-cerrar');
    // console.log('btnCerrar', btnCerrar);
    if (btnCerrar) {
        btnCerrar.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(event.target);

            ventanaTrabajos.classList.add('modal__invisible');
        });
    }

    document.querySelector('.ventana').addEventListener('click', (event) => {
        event.preventDefault();
        console.log('le diste a un elemento que no es .ventana', event.target); 
        
        if (event.target.matches('.ventana')) {
            ventanaTrabajos.classList.add('modal__invisible');
            console.log('le diste a .ventana', event.target); 
        }
    });

    // Añadir event listeners específicos para que funcionen los enlaces en .iconos-contenedor
    document.querySelectorAll('.iconos-contenedor a').forEach(link => {
        link.addEventListener('click', function(event) {
            // Asegurarse de que la navegación no sea bloqueada
            event.stopPropagation(); // Previene que otros manejadores de eventos interfieran
        });
    });
}
/* *********************************************************** copy */
const copyButton = document.getElementById('copy-button')

copyButton.addEventListener('click', copyEmail)
function copyEmail() {
  
  const email = document.getElementById('email-link').textContent;
  navigator.clipboard.writeText(email).then(function() {
    alert('Correo copiado al portapapeles: ' + email);
  }, function(err) {
    console.error('No se pudo copiar el correo: ', err);
  });
}

/* ************************************************************* Traducciones */
import { texts } from './DB/translations.js';

const languageOptions = document.querySelectorAll('.language-option');
const translatableElements = document.querySelectorAll('[id^="subtitle"], [id^="title"], [id^="text"], [id^="subhero_"], [id^="herramientas"], [id^="trabajos_"], [id^="container_"], [id^="form_"] , [id^="footer_"], [id^="language"], [id^="contact"], [id^="CV"]');

languageOptions.forEach(option => {
  option.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedLanguage = option.dataset.lang;
    applyTranslations(selectedLanguage);
  });
});

function applyTranslations(language) {
  translatableElements.forEach(element => {
    const key = element.id;
    if (texts[language] && texts[language][key]) {
      element.innerText = texts[language][key];
    }
  });
}
/* ************************************************************* */
/* ************************************************************* Cookies */

/* function acceptCookies() {
  // Ocultar el banner
  document.getElementById('cookie-banner').style.display = 'none';
  // Guardar el consentimiento en localStorage
  localStorage.setItem('cookiesAccepted', 'true');
}

// Comprobar si el usuario ya ha aceptado las cookies
if (localStorage.getItem('cookiesAccepted')) {
  document.getElementById('cookie-banner').style.display = 'none';
}
 */
/* Cookies */
document.cookie = "cookieName=cookieValue; SameSite=None; Secure";

const buttonCookies = document.getElementById('button-cookies')

buttonCookies.addEventListener('click', acceptCookies)

function acceptCookies() {
  document.getElementById('cookie-banner').style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
}

document.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-banner').style.display = 'none';
  } else {
    document.getElementById('cookie-banner').style.display = 'block'; // Mostrar el banner si las cookies no han sido aceptadas
  }
});


/* ************************** Desaperecer dropdown clicando fuera */
/* document.addEventListener('click', function(event) {
  var languageDropdown = document.getElementById('language-dropdown');
  var curriculumDropdown = document.getElementById('curriculum-dropdown');
  var contactoDropdown = document.getElementById('contacto-dropdown');

  // Verificar si el clic no está dentro del dropdown o su botón de activación
  if (!languageDropdown.contains(event.target) && 
      !curriculumDropdown.contains(event.target) && 
      !contactoDropdown.contains(event.target)) {
    // Cerrar los dropdowns
    languageDropdown.checked = false;
    curriculumDropdown.checked = false;
    contactoDropdown.checked = false;
  }
});
 */
