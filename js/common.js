/* theme toggle */
const themeToggle = document.querySelector(".theme-toggle");

/* theme apply */
// 다크 모드 아이콘 변경
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
const savedTheme = localStorage.getItem("darkMode") === "true"; //다크 모드 여부를 로컬스토리지에서 가져옵니다
applyTheme(savedTheme);
// 토글 버튼 클릭시 테마 전환
if (themeToggle) {
    themeToggle.addEventListener("click", () => { //클릭시 이벤트가 발생합니다
        const nextTheme = !document.body.classList.contains("dark-mode"); //현재 다크 모드 여부를 확인하고 그 반대를 nextTheme에 저장합니다
        localStorage.setItem("darkMode", String(nextTheme)); //로컬스토리지에 nextTheme을 저장합니다
        applyTheme(nextTheme); //applyTheme 함수를 호출하여 테마를 적용합니다
    });
}