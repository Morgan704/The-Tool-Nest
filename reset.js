// Universal Reset Script for The Tool Nest

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reset-btn").forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;

      // Clear textareas or inputs
      if (target) {
        document.querySelectorAll(target).forEach(el => {
          if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
            el.value = "";
          } else {
            el.innerHTML = "";
          }
        });
      }
    });
  });
});


