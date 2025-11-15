async function loadTranslations(lang) {
  try {
    const response = await fetch(`../assets/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error loading ${lang} translations:`, error);
    return {}; // Fallback empty object
  }
}

let translations = {};
let currentLang = localStorage.getItem("siteLang") || "en";

async function updateLanguage(lang) {
  currentLang = lang;
  // Persist selection so switching pages keeps the chosen language
  try {
    localStorage.setItem("siteLang", lang);
  } catch (e) {
    // ignore storage errors (e.g., private mode)
  }
  translations = await loadTranslations(lang);
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
  // Update active flag
  document.querySelectorAll(".lang-flag").forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("data-lang") === lang) {
      item.classList.add("active");
    }
  });
}

// Init ngay lập tức, không chờ DOMContentLoaded (vì partial load muộn)
function initLanguage() {
  console.log("Initializing language..."); // Debug
  const flags = document.querySelectorAll(".lang-flag");
  if (flags.length === 0) {
    console.warn("No lang-flag elements found!"); // Debug nếu không tìm thấy
    return;
  }
  flags.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = item.getAttribute("data-lang");
      if (lang !== currentLang) {
        updateLanguage(lang);
      }
    });
  });
  // Apply saved or default language
  updateLanguage(currentLang);
}

// Chạy init ngay
initLanguage();

let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.pageYOffset > 20) {
    // Bắt đầu thay đổi sau khi scroll > 50px
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  lastScrollTop = window.pageYOffset;
});
