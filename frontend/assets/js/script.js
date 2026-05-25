console.log("SBK-Holts Military Banking System Loaded");

document.addEventListener("DOMContentLoaded", () => {

  // Secure Login Button
  const loginBtn = document.querySelector(".login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "/login.html";
    });
  }

  // Open Account Button
  const openBtn = document.querySelector(".open-btn");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      window.location.href = "/login.html";
    });
  }

});
