function flipCard(card) {
  card.classList.toggle("flipped");
}

document.addEventListener("DOMContentLoaded", () => {
  const readMoreButtons = document.querySelectorAll(".card_back_button button");
  const infoBoxes = document.querySelectorAll(".product_info_box");

  readMoreButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn chặn event lan ra card ngoài để tránh flip tự động

      // Flip card trở về mặt trước
      const card = button.closest(".product_card");
      if (card) {
        card.classList.remove("flipped");
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
