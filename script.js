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
