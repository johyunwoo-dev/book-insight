/* theme toggle */
const themeToggle = document.querySelector(".theme-toggle");

/* theme apply */
function applyTheme(isDarkMode) {
    document.body.classList.toggle("dark-mode", isDarkMode);

    if (themeToggle) {
        themeToggle.textContent = isDarkMode ? "☼" : "☾";
    }
}

/* toast */
function showToast(message) {
    const previousToast = document.querySelector(".toast");

    if (previousToast) {
        previousToast.remove();
    }
    // 토스트 생성
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    window.setTimeout(() => {
        toast.remove();
    }, 2200);
}
// 저장된 테마 유지
const savedTheme = localStorage.getItem("darkMode") === "true";
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = !document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", String(nextTheme));
        applyTheme(nextTheme);
    });
}