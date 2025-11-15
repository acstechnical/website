function flipCard(card) {
  card.classList.toggle("flipped");
}

document.addEventListener("DOMContentLoaded", () => {
  const readMoreButtons = document.querySelectorAll(".card_back_button button");
  const infoBoxes = document.querySelectorAll(".product_info_box");
  const infoContainer = document.querySelector(".product_info_container");

  readMoreButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn chặn event lan ra card ngoài để tránh flip tự động

      // Flip card trở về mặt trước
      const card = button.closest(".product_card");
      if (card) {
        card.classList.remove("flipped");
      }

      // Ẩn tất cả các product_info_box khác
      infoBoxes.forEach((box, boxIndex) => {
        if (boxIndex !== index) {
          box.style.display = "none";
        }
      });

      // Hiện product_info_box tương ứng
      if (infoBoxes[index]) {
        infoBoxes[index].style.display = "flex";
      }

      // Hiện container nếu chưa hiện (và vì có ít nhất một box hiện, container cần hiện)
      if (infoContainer.style.display !== "flex") {
        infoContainer.style.display = "flex";
      }

      // Cuộn xuống product_info_box tương ứng (sử dụng index)
      if (infoBoxes[index]) {
        infoBoxes[index].scrollIntoView({
          behavior: "smooth", // Cuộn mượt mà
          block: "start", // Cuộn đến đầu phần tử
        });
      }
    });
  });
});
