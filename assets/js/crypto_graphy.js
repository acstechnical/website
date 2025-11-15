function toggleModule(contentId) {
  const content = document.getElementById(contentId);
  const title = content.previousElementSibling;
  content.classList.toggle("show");
  title.classList.toggle("active");
}
