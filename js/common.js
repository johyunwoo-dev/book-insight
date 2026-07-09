/* theme toggle */
const themeToggle = document.querySelector(".theme-toggle");

/* theme apply */
// 다크 모드 아이콘 변경
function applyTheme(isDarkMode) {
    document.body.classList.toggle("dark-mode", isDarkMode); //다크 모드 여부를 확인하고 다크모드를 적용합니다

    if (themeToggle) {
        themeToggle.textContent = isDarkMode ? "☼" : "☾"; //다크 모드일시 햇님 아이콘, 아닐시 달 아이콘으로 변경합니다
    }
}

/* toast */
//이전 토스트를 찾아서 제거합니다
function showToast(message) { 
    const previousToast = document.querySelector(".toast"); 

    if (previousToast) {
        previousToast.remove(); //이전에 생성된 토스트가 있으면 제거합니다
    }
    // 토스트 생성
    const toast = document.createElement("div"); //div 요소를 생성합니다
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    window.setTimeout(() => { //시간의 경과 후 토스트를 제거합니다
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