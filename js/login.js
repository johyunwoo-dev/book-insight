/* 로그인에 필요한 화면 요소들(폼, 입력창, 버튼) 다 찾아오기 */
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");
const loginButton = document.querySelector(".login-button");

/* 이메일과 비밀번호 입력 조건을 체크해서 로그인 버튼 활성화하기 */
function updateLoginState() {
    const hasEmail = emailInput.value.trim().length > 0;
    const hasPassword = passwordInput.value.trim().length >= 6;
    loginButton.disabled = !(hasEmail && hasPassword);
}

/* 비밀번호 보기/숨기기 버튼 클릭 시 입력창 타입과 버튼 글자 바꾸기 */
if (passwordToggle) {
    passwordToggle.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        passwordToggle.textContent = isPassword ? "숨김" : "보기";
        passwordToggle.setAttribute("aria-label", isPassword ? "비밀번호 숨기기" : "비밀번호 보기");
    });
}

/* 사용자가 글자를 입력할 때마다 로그인 버튼 상태 실시간으로 업데이트하기 */
if (emailInput && passwordInput && loginButton) {
    emailInput.addEventListener("input", updateLoginState);
    passwordInput.addEventListener("input", updateLoginState);
    updateLoginState();
}

/* 로그인 폼 전송 시 새로고침 막고 안내 알림창 띄우기 */
if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        showToast("입력 확인이 완료되었습니다.");
    });
}