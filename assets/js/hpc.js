document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const descriptions = document.querySelectorAll(".description");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove selected class from all cards
      cards.forEach((c) => c.classList.remove("selected"));

      // Add selected to current
      card.classList.add("selected");

      // Hide all descriptions
      descriptions.forEach((desc) => desc.classList.remove("active"));

      // Get the desc id
      const descId = card.getAttribute("data-desc");

      // Show the corresponding description
      if (descId) {
        const targetDesc = document.getElementById(descId);
        if (targetDesc) {
          targetDesc.classList.add("active");
        }
      }
    });
  });
});
