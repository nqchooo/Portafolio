
// MENÚ PARA CELULARES

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}


// AÑO AUTOMÁTICO DEL FOOTER

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ANIMACIONES AL DESPLAZARSE

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}


// TEXTO ANIMADO DE LA PORTADA

const typewriter = document.querySelector(".typewriter");

if (typewriter) {
  const phrases = [
    "Diseño = Más clientes.",
    "Potencia tu negocio."
  ];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    typewriter.textContent = phrases[0];
  } else {
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const type = () => {
      const phrase = phrases[phraseIndex];

      typewriter.textContent = phrase.slice(0, characterIndex);

      let delay = deleting ? 48 : 88;

      if (!deleting && characterIndex < phrase.length) {
        characterIndex++;
      } else if (deleting && characterIndex > 0) {
        characterIndex--;
      } else if (!deleting) {
        deleting = true;
        delay = 1500;
      } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }

      window.setTimeout(type, delay);
    };

    type();
  }
}


// TEXTO ANIMADO DE CONTACTO

const contactTypewriter = document.querySelector(".contact-typewriter");

if (contactTypewriter) {
  const firstLine = contactTypewriter.querySelector(".contact-typewriter-first");
  const secondLine = contactTypewriter.querySelector(".contact-typewriter-second");

  const firstText = "Cuando";
  const secondText = "quieras.";

  const reduceContactMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceContactMotion) {
    firstLine.textContent = firstText;
    secondLine.textContent = secondText;
  } else {
    let line = 0;
    let character = 0;
    let deleting = false;

    const animateContactText = () => {
      const currentText = line === 0 ? firstText : secondText;
      const target = line === 0 ? firstLine : secondLine;

      target.textContent = currentText.slice(0, character);

      let delay = deleting ? 55 : 105;

      if (!deleting && character < currentText.length) {
        character++;
      } else if (!deleting) {
        if (line === 0) {
          line = 1;
          character = 0;
          delay = 260;
        } else {
          delay = 1600;
          deleting = true;
        }
      } else if (character > 0) {
        character--;
      } else if (line === 1) {
        line = 0;
        character = firstText.length;
        delay = 180;
      } else {
        deleting = false;
        character = 0;
        delay = 450;
      }

      window.setTimeout(animateContactText, delay);
    };

    animateContactText();
  }
}


// VENTANAS AMPLIADAS DE LOS PROYECTOS

const projectDialog = document.querySelector(".project-dialog");

if (projectDialog && typeof projectDialog.showModal === "function") {
  const dialogTitle = projectDialog.querySelector("#project-dialog-title");
  const dialogType = projectDialog.querySelector("#project-dialog-type");
  const dialogNumber = projectDialog.querySelector("#project-dialog-number");
  const dialogDescription = projectDialog.querySelector("#project-dialog-description");
  const closeDialogButton = projectDialog.querySelector(".project-dialog-close");

  // Abrir el proyecto seleccionado
  document.querySelectorAll(".project-card[data-project-title]").forEach((card) => {
    card.addEventListener("click", () => {
      dialogTitle.textContent = card.dataset.projectTitle;
      dialogType.textContent = card.dataset.projectType;
      dialogNumber.textContent = card.dataset.projectNumber + " / 05";
      dialogDescription.textContent = card.dataset.projectDescription;

      projectDialog.showModal();
    });
  });

  // Cerrar con el botón X
  closeDialogButton.addEventListener("click", () => {
    projectDialog.close();
  });

  // Cerrar al tocar fuera de la ventana
  projectDialog.addEventListener("click", (event) => {
    if (event.target === projectDialog) {
      projectDialog.close();
    }
  });
}
