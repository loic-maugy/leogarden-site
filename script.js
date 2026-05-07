const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

const quoteForm = document.getElementById("quoteForm");
const formStatus = document.getElementById("formStatus");

if (quoteForm && formStatus) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const name = formData.get("name");

    formStatus.textContent = `Merci ${name || ""}, votre demande est prete a etre envoyee. (Branchement email/API a faire)`;
    quoteForm.reset();
  });
}

const reviewsTrack = document.getElementById("reviewsTrack");
const reviewsPrev = document.getElementById("reviewsPrev");
const reviewsNext = document.getElementById("reviewsNext");

if (reviewsTrack && reviewsPrev && reviewsNext) {
  const getScrollStep = () => {
    const firstCard = reviewsTrack.querySelector(".review-card");
    if (!firstCard) return 320;
    return firstCard.clientWidth + 16;
  };

  reviewsPrev.addEventListener("click", () => {
    reviewsTrack.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  reviewsNext.addEventListener("click", () => {
    reviewsTrack.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });
}

const baSlider = document.getElementById("baSlider");
const baOverlay = document.getElementById("baOverlay");
const baDivider = document.getElementById("baDivider");

if (baSlider && baOverlay && baDivider) {
  const updateBeforeAfter = () => {
    const value = Number(baSlider.value);
    baOverlay.style.width = `${value}%`;
    baDivider.style.left = `${value}%`;
  };

  baSlider.addEventListener("input", updateBeforeAfter);
  updateBeforeAfter();
}

const navLinks = Array.from(document.querySelectorAll("#mainNav a"));
const sections = Array.from(document.querySelectorAll("section[id]"));

if (navLinks.length && sections.length) {
  const setActiveLink = (sectionId) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
    });
  };

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => setActiveLink(entry.target.id));
    },
    { threshold: 0.4, rootMargin: "-20% 0px -35% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));
}

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.revealDelay || "0ms";
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item, index) => {
    item.dataset.revealDelay = `${index * 80}ms`;
    revealObserver.observe(item);
  });
}
