/* elements */
//요소 대입해서 html 파일과  연결합니다.
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");
const loginButton = document.querySelector(".login-button");

/* state */
function updateLoginState() {
    // 이메일과 비번 입력 상태
    const hasEmail = emailInput.value.trim().length > 0;
    const hasPassword = passwordInput.value.trim().length >= 6;
    loginButton.disabled = !(hasEmail && hasPassword);
}

/* password toggle */
if (passwordToggle) {
    passwordToggle.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        passwordToggle.textContent = isPassword ? "숨김" : "보기";
    });
}

/* input */
// 로그인의 입력을 실시간 타이핑
if (emailInput && passwordInput && loginButton) {
    emailInput.addEventListener("input", updateLoginState);
    passwordInput.addEventListener("input", updateLoginState);
    updateLoginState();
}

/* submit */
if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        showToast("입력 확인이 완료되었습니다.");
    });
}