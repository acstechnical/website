// Lấy riêng desc_card_1
const card1 = document.querySelector(".desc_card_1");
const track = card1.querySelector(".sliding_track");
const pages = card1.querySelectorAll(".sliding_page");

let currentPage = 0;

function goToPage(n) {
  const containerWidth = card1.querySelector(".content_container").offsetWidth;
  if (n < 0 || n >= pages.length) return;
  currentPage = n;
  track.style.transform = `translateX(-${n * containerWidth}px)`;
}

// Gán sự kiện
card1.querySelector(".left_sliding").onclick = () => goToPage(currentPage - 1);
card1.querySelector(".right_sliding").onclick = () => goToPage(currentPage + 1);

document.querySelectorAll(".vid_nav_item").forEach((nav) => {
  nav.addEventListener("click", () => {
    // remove active from all
    document.querySelectorAll(".vid_nav_item").forEach((n) => n.classList.remove("active_nav"));
    nav.classList.add("active_nav");

    const target = nav.dataset.target;

    // hide all videos
    document.querySelectorAll(".video").forEach((v) => v.classList.remove("active_vid"));

    // show target video
    document.querySelector(`.${target}`).classList.add("active_vid");
  });
});
