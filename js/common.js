/* 화면에서 테마 변경(다크모드 토글) 버튼 찾아오기 */
const themeToggle = document.querySelector(".theme-toggle");

/* 다크모드 켜고 끄기 및 버튼 아이콘(해/달) 바꾸기 */
function applyTheme(isDarkMode) {
    document.body.classList.toggle("dark-mode", isDarkMode);

    if (themeToggle) {
        themeToggle.textContent = isDarkMode ? "☼" : "☾";
        themeToggle.setAttribute("aria-pressed", String(isDarkMode));
    }
}

/* 화면에 잠시 떴다 사라지는 알림창(토스트) 띄우기 */
function showToast(message) {
    const previousToast = document.querySelector(".toast");

    /* 이미 켜져 있는 알림창이 있다면 먼저 지우기 */
    if (previousToast) {
        previousToast.remove();
    }

    /* 새 알림창 상자 만들고 글씨 채워서 화면에 붙이기 */
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.appendChild(toast);

    /* 2.2초 뒤에 알림창 자동으로 사라지게 하기 */
    window.setTimeout(() => {
        toast.remove();
    }, 2200);
}

/* 브라우저(localStorage)에 저장되어 있던 이전 테마 기억 불러오기 */
const savedTheme = localStorage.getItem("darkMode") === "true";
applyTheme(savedTheme);

/* 테마 변경 버튼을 클릭하면 다음 테마로 바꾸고 저장하기 */
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = !document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", String(nextTheme));
        applyTheme(nextTheme);
    });
}