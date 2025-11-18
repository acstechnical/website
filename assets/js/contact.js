function waitForEmailJS(callback, attempts = 0) {
  if (typeof emailjs !== "undefined") {
    emailjs.init("0Qn40eICZlgxW-zEM"); // Public Key của bạn
    console.log("EmailJS đã sẵn sàng!");
    callback();
  } else {
    if (attempts > 50) {
      // chờ tối đa ~5 giây
      console.error("EmailJS load quá lâu!");
      return;
    }
    setTimeout(() => waitForEmailJS(callback, attempts + 1), 100);
  }
}

// Chạy toàn bộ code chỉ khi EmailJS đã load xong
waitForEmailJS(function () {
  // Modal functions
  window.openModal = () => {
    document.getElementById("contactModal").style.display = "block";
  };

  window.closeModal = () => {
    document.getElementById("contactModal").style.display = "none";
  };

  // Đóng modal khi click ngoài
  window.addEventListener("click", function (e) {
    const modal = document.getElementById("contactModal");
    if (e.target === modal) closeModal();
  });

  // Header scroll effect
  window.addEventListener("scroll", () => {
    document.querySelector("header").classList.toggle("scrolled", window.pageYOffset > 20);
  });

  // Xử lý form contact
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");

  if (!form) {
    console.error("Không tìm thấy form #contactForm");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    msg.textContent = "Đang gửi...";
    msg.style.display = "block";
    msg.style.backgroundColor = "#f0f0f0";
    msg.style.color = "#333";

    // Thêm ngày giờ Việt Nam
    const now = new Date();
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

    const params = {
      from_name: form.name.value.trim(),
      from_phone: form.phone.value.trim(),
      from_email: form.email.value.trim(),
      message: form.message.value.trim(),
      date: now.toLocaleDateString("vi-VN", dateOptions),
      time: now.toLocaleTimeString("vi-VN", timeOptions),
    };

    emailjs
      .send("service_3o3hqd7", "template_ti25sjv", params)
      .then(() => {
        msg.textContent = "Gửi thành công! Cảm ơn bạn.";
        msg.style.backgroundColor = "#d4edda";
        msg.style.color = "#155724";
        form.reset();
        setTimeout(closeModal, 2000);
      })
      .catch((err) => {
        console.error("Lỗi gửi mail:", err);
        msg.textContent = "Gửi thất bại, vui lòng thử lại sau.";
        msg.style.backgroundColor = "#f8d7da";
        msg.style.color = "#721c24";
      });
  });
});
