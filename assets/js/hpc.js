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

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".content_box");

  boxes.forEach((box) => {
    const button = box.querySelector("button");
    const content = box.querySelector(".content");

    button.addEventListener("click", (e) => {
      e.preventDefault(); // Ngăn hành vi mặc định nếu cần

      const isOpen = content.classList.contains("active"); // Kiểm tra trạng thái hiện tại

      // Đóng tất cả các content (bao gồm cái đang mở)
      boxes.forEach((b) => b.querySelector(".content").classList.remove("active"));

      // Nếu cái này chưa mở (isOpen = false), thì mở nó
      if (!isOpen) {
        content.classList.add("active");
      }
      // Nếu đã mở, thì không làm gì (đã đóng ở trên)
    });
  });
});
