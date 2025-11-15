function initEmailJS() {
  if (typeof emailjs !== "undefined") {
    emailjs.init("0Qn40eICZlgxW-zEM");
    console.log("EmailJS initialized successfully");
  } else {
    console.warn("EmailJS not loaded yet. Retrying in 100ms...");
    setTimeout(initEmailJS, 100);
  }
}

// Gọi initEmailJS ngay khi file load
initEmailJS();

// Expose modal controls immediately so inline `onclick="openModal()"` works
// even if this script is injected after DOMContentLoaded.
window.openModal = function () {
  const modal = document.getElementById("contactModal");
  if (modal) modal.style.display = "block";
};

window.closeModal = function () {
  const modal = document.getElementById("contactModal");
  if (modal) modal.style.display = "none";
};

// Phần còn lại của code language (loadTranslations, updateLanguage, etc.) giữ nguyên
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

// Modal functions (đảm bảo DOM ready)
document.addEventListener("DOMContentLoaded", () => {
  // Expose modal controls on window so inline onclick in partial works
  window.openModal = function () {
    const modal = document.getElementById("contactModal");
    if (modal) modal.style.display = "block";
  };

  window.closeModal = function () {
    const modal = document.getElementById("contactModal");
    if (modal) modal.style.display = "none";
  };

  // Keep local aliases for existing internal calls
  const openModal = window.openModal;
  const closeModal = window.closeModal;

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("contactModal");
    if (event.target === modal) {
      closeModal();
    }
  });

  // Xử lý form submit tự động qua EmailJS (chỉ giữ 1 listener)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Ngăn submit mặc định

      // Kiểm tra EmailJS đã load chưa
      if (typeof emailjs === "undefined") {
        console.error("EmailJS not loaded. Cannot send email.");
        return;
      }

      const form = e.target;
      const formMessage = document.getElementById("formMessage");

      // Hiển thị loading
      formMessage.textContent = "Đang gửi...";
      formMessage.style.display = "block";
      formMessage.style.backgroundColor = "#f0f0f0";
      formMessage.style.color = "#333";

      // Gửi email qua EmailJS
      emailjs
        .send("service_3o3hqd7", "template_ti25sjv", {
          from_name: form.name.value,
          from_phone: form.phone.value,
          from_email: form.email.value,
          message: form.message.value,
        })
        .then(
          (result) => {
            // Thành công
            formMessage.textContent = "Gửi thành công! Cảm ơn bạn.";
            formMessage.style.backgroundColor = "#d4edda";
            formMessage.style.color = "#155724";
            form.reset(); // Reset form
            setTimeout(closeModal, 2000); // Đóng modal sau 2s
          },
          (error) => {
            // Lỗi
            formMessage.textContent = "Gửi thất bại. Vui lòng thử lại.";
            formMessage.style.backgroundColor = "#f8d7da";
            formMessage.style.color = "#721c24";
            console.error("EmailJS error:", error);
          }
        );
    });
  }

  // Scroll effect for header
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.pageYOffset > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    lastScrollTop = window.pageYOffset;
  });
});
