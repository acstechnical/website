// Hàm xử lý sliding chung cho mọi desc_card
function initSlider(card) {
  if (!card) return;

  const track = card.querySelector(".sliding_track");
  const pages = card.querySelectorAll(".sliding_page");
  const leftBtn = card.querySelector(".left_sliding");
  const rightBtn = card.querySelector(".right_sliding");
  const container = card.querySelector(".content_container");

  if (!track || pages.length <= 1) {
    // Nếu chỉ có 1 trang hoặc không có trang → ẩn luôn cả 2 nút
    if (leftBtn) leftBtn.classList.add("hidden");
    if (rightBtn) rightBtn.classList.add("hidden");
    return;
  }

  let currentPage = 0;
  const totalPages = pages.length;

  // Hàm cập nhật trạng thái nút
  function updateButtons() {
    if (leftBtn) {
      leftBtn.classList.toggle("hidden", currentPage === 0);
    }
    if (rightBtn) {
      rightBtn.classList.toggle("hidden", currentPage === totalPages - 1);
    }
  }

  // Hàm chuyển trang
  function goToPage(n) {
    if (n < 0 || n >= totalPages) return;
    currentPage = n;

    const containerWidth = container.offsetWidth;
    track.style.transform = `translateX(-${currentPage * containerWidth}px)`;

    updateButtons();
  }

  // Sự kiện nút
  if (leftBtn) leftBtn.onclick = () => goToPage(currentPage - 1);
  if (rightBtn) rightBtn.onclick = () => goToPage(currentPage + 1);

  // Khởi tạo trạng thái ban đầu
  updateButtons();

  // Cập nhật lại khi resize (để tính lại width chính xác)
  window.addEventListener("resize", () => {
    const containerWidth = container.offsetWidth;
    track.style.transform = `translateX(-${currentPage * containerWidth}px)`;
  });
}

// Khởi tạo cho card 1 (hiện tại chỉ card 1 có nhiều trang)
initSlider(document.querySelector(".desc_card_1"));
initSlider(document.querySelector(".desc_card_2"));
initSlider(document.querySelector(".desc_card_3"));
initSlider(document.querySelector(".desc_card_4"));
initSlider(document.querySelector(".desc_card_5"));

// Nếu sau này card 2, 3, 4 có nội dung slide, chỉ cần thêm:
// initSlider(document.querySelector(".desc_card_2"));
// initSlider(document.querySelector(".desc_card_3"));
// ...

// Video navigator (giữ nguyên phần cũ của bạn)
document.querySelectorAll(".vid_nav_item").forEach((nav) => {
  nav.addEventListener("click", () => {
    document.querySelectorAll(".vid_nav_item").forEach((n) => n.classList.remove("active_nav"));
    nav.classList.add("active_nav");

    const target = nav.dataset.target;
    document.querySelectorAll(".video").forEach((v) => v.classList.remove("active_vid"));
    document.querySelector(`.${target}`).classList.add("active_vid");
  });
});
