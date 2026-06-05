/* ===============================================
   Sections and internal links
================================================== */

const sections = Array.from(
  document.querySelectorAll("#introduction, #about, #contact")
);

const internalLinks = document.querySelectorAll("a[data-target]");

/* ===============================================
   Scroll control settings
================================================== */

let currentSection = 0;
let lastScrollTime = 0;

const scrollForce = 50;
const scrollCooldown = 250;

/* ===============================================
   Function to scroll to a specific section
================================================== */

function goToSection(index) {
  if (index < 0 || index >= sections.length) return;

  currentSection = index;

  sections[index].scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  /* Remove hashtags from the search bar */
  history.replaceState(null, "", window.location.pathname);
}

/* ===============================================
   Script to disappear the hashtags from searchbar
================================================== */

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    link.blur();


    const targetId = link.dataset.target;
    const targetSection = document.getElementById(targetId);

    if (!targetSection) return;

    const targetIndex = sections.indexOf(targetSection);

    if (targetIndex !== -1) {
      goToSection(targetIndex);
    }
  });
});

/* ===============================================
   Script to control smooth section scrolling
================================================== */

window.addEventListener(
  "wheel",
  (event) => {
    if (window.innerWidth <= 768) return;

    event.preventDefault();

    const now = Date.now();

    if (now - lastScrollTime < scrollCooldown) return;

    if (event.deltaY > scrollForce) {
      goToSection(currentSection + 1);
      lastScrollTime = now;
    }

    if (event.deltaY < -scrollForce) {
      goToSection(currentSection - 1);
      lastScrollTime = now;
    }
  },
  { passive: false }
);

/* ===============================================
   Script to show and hide About section animation
================================================== */

const aboutSection = document.getElementById("about");

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutSection.classList.add("show");
      } else {
        aboutSection.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.8
  }
);

aboutObserver.observe(aboutSection);