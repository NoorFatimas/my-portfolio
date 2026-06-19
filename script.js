/* =========================================================
   1. MOBILE NAV TOGGLE
   ========================================================= */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu after tapping a link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
} else {
  console.warn('Nav toggle skipped: #navToggle or #navLinks not found in the HTML.');
}

/* =========================================================
   2. ACTIVE NAV LINK ON SCROLL
   ========================================================= */
const sections = document.querySelectorAll('main section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = sections[0]?.id;
  const offset = 110;

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= offset) current = section.id;
  });

  navLinkEls.forEach((link) => {
    link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

/* =========================================================
   3. SCROLL REVEAL (IntersectionObserver)
   ========================================================= */
const revealEls = document.querySelectorAll('[data-reveal]');

// Only hide-then-animate if this script actually runs.
revealEls.forEach((el) => el.classList.add('reveal-init'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* =========================================================
   4. HERO CONFIDENCE BAR — fills once hero is in view
   ========================================================= */
const confidenceFill = document.querySelector('.confidence-fill');
if (confidenceFill) {
  setTimeout(() => confidenceFill.classList.add('is-filled'), 500);
}

/* =========================================================
   5. TYPED ROLE ROTATOR
   ========================================================= */
const roles = ['code.', 'APIs.', 'full-stack apps.','MERN.','Laravel.','Python/FastAPI.', 'real solutions.'];
const typedEl = document.querySelector('.typed-role');

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 45 : 70);
}

typeLoop();

/* =========================================================
   6. CONTACT FORM — client-side validation + demo submit
   NOTE: This is a static front-end form. To actually receive
   emails, connect it to a service like Formspree or EmailJS
   and point the fetch() call below at that endpoint.
   ========================================================= */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(field, message) {
  const errorEl = contactForm.querySelector(`[data-error-for="${field.name}"]`);
  field.classList.toggle('is-invalid', Boolean(message));
  if (errorEl) errorEl.textContent = message;
}

function validateForm() {
  let valid = true;
  const name = contactForm.elements.name;
  const email = contactForm.elements.email;
  const message = contactForm.elements.message;

  if (!name.value.trim()) {
    showError(name, 'Please enter your name.');
    valid = false;
  } else {
    showError(name, '');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, 'Please enter a valid email address.');
    valid = false;
  } else {
    showError(email, '');
  }

  if (!message.value.trim()) {
    showError(message, 'Please write a short message.');
    valid = false;
  } else {
    showError(message, '');
  }

  return valid;
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Demo behavior only — replace with a real submission call.
    formSuccess.classList.add('is-visible');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('is-visible'), 4000);
  });
}

/* =========================================================
   7. BACK TO TOP
   ========================================================= */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
