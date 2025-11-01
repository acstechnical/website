document.addEventListener("DOMContentLoaded", function () {
  // Function to load partial and execute scripts/styles
  function loadPartial(url, containerId) {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${containerId}`);
        return response.text();
      })
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`No #${containerId} found`);

        container.innerHTML = doc.body.innerHTML;

        const styles = doc.querySelectorAll("style");
        styles.forEach((oldStyle) => {
          const newStyle = document.createElement("style");
          newStyle.textContent = oldStyle.textContent;
          Array.from(oldStyle.attributes).forEach((attr) => newStyle.setAttribute(attr.name, attr.value));
          document.head.appendChild(newStyle); // Global apply
        });

        // Execute scripts
        const scripts = doc.querySelectorAll("script");
        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            newScript.src = oldScript.src; // External script
          } else {
            newScript.textContent = oldScript.innerHTML; // Inline script
          }
          Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
          container.appendChild(newScript); // Append để run
        });
      })
      .catch((error) => console.error(`Error loading ${containerId}:`, error));
  }

  // Load header
  loadPartial("../partials/header.html", "header");

  // Load footer (nếu có CSS/script)
  loadPartial("../partials/footer.html", "footer");
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const devices = document.querySelectorAll(".device");
  const totalDurationMs = 10 * 1000; // 10s
  const quantity = parseInt(carousel.style.getPropertyValue("--quantity"));
  const totalSeconds = totalDurationMs / 1000;

  let startTime = localStorage.getItem("carouselStartTime");
  if (!startTime) {
    startTime = Date.now().toString();
  }
  const currentTime = Date.now();
  const elapsedMs = currentTime - parseInt(startTime);
  let offsetSeconds = (elapsedMs / 1000) % totalSeconds;
  if (offsetSeconds < 0) offsetSeconds += totalSeconds;

  devices.forEach((device) => {
    const position = parseInt(device.style.getPropertyValue("--position"));
    const origDelaySec = (totalSeconds / quantity) * (position - 1);
    let localElapsedSec = (offsetSeconds - origDelaySec + totalSeconds) % totalSeconds;
    const newDelaySec = -localElapsedSec;
    device.style.animationDelay = newDelaySec + "s";
  });

  localStorage.setItem("carouselStartTime", currentTime.toString());

  setTimeout(() => localStorage.removeItem("carouselStartTime"), 24 * 60 * 60 * 1000);
});
