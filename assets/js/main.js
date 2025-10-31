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
