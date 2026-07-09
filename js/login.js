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
    const hasEmail = emailInput.value.trim().length > 0; //이메일칸 입력 0글자 이상
    const hasPassword = passwordInput.value.trim().length >= 6; // 비밀번호칸 입력 6글자 이상
    loginButton.disabled = !(hasEmail && hasPassword); // 두 입력 칸 모두 입력이 True일시 비활성화를 풉니다.
    }

/* password toggle */
//클릭할시 숨김/보기 버튼을 바꿔 줍니다.
if (passwordToggle) {
    passwordToggle.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password"; //패스워드 입력칸에 입력된 타입이 패스워드인지 확인합니다
        passwordInput.type = isPassword ? "text" : "password";//패스워드일시 텍스트 타입으로 바꿈으로 보이게 합니다
        passwordToggle.textContent = isPassword ? "숨김" : "보기";//이 부분이 변경 부분
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
//폼 제출을 통해 로고인 토스트를 올려줍니다.
if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); //상위 전파를 막습니다.
        showToast("입력 확인이 완료되었습니다.");
    });
}