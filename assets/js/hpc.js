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

function applyTranslations(data) {
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (data && data[key]) {
      try {
        // Thử innerHTML trước (parse tag)
        el.innerHTML = data[key];
        // Nếu vẫn lỗi (hiếm), fallback plain text bằng cách strip tags
        if (el.innerHTML.includes("<em>") && !el.querySelector("em")) {
          // Check nếu tag không render
          el.innerHTML = data[key].replace(/<em>(.*?)<\/em>/g, "$1"); // Strip <em>
        }
      } catch (e) {
        el.textContent = data[key]; // Fallback textContent nếu innerHTML fail
      }
    }
  });
}
