// Load header & footer dynamically
document.addEventListener("DOMContentLoaded", function () {
  // Load header
  fetch("../partials/header.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load header");
      return response.text();
    })
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    })
    .catch((error) => console.error("Error loading header:", error));

  // Load footer
  fetch("../partials/footer.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load footer");
      return response.text();
    })
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
});
