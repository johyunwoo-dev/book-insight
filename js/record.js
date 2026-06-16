/* 입력창, 등록 버튼, 기록 목록이 들어갈 판 찾아오기 */
const recordTextarea = document.querySelector(".record-textarea");
const recordButton = document.querySelector(".record-button");
const recordLists = document.querySelectorAll(".record-list");

/* 브라우저(localStorage)에서 기존 기록 목록 불러오기 */
function getRecords() {
    return JSON.parse(localStorage.getItem("records") || "[]");
}

/* 현재 기록 배열을 브라우저에 데이터로 저장하기 */
function saveRecords(records) {
    localStorage.setItem("records", JSON.stringify(records));
}

/* 입력창이 비어있으면 등록 버튼 비활성화하기 */
function updateRecordButton() {
    if (recordButton && recordTextarea) {
        recordButton.disabled = recordTextarea.value.trim().length === 0;
    }
}

/* 새 글을 맨 위에 추가하고 입력창 비우기 */
function saveRecord() {
    const recordValue = recordTextarea.value.trim();

    if (!recordValue) {
        showToast("문장을 먼저 적어주세요.");
        return;
    }

    const records = getRecords();
    records.unshift(recordValue);
    saveRecords(records);

    recordTextarea.value = "";
    updateRecordButton();
    renderRecords();
    showToast("기록을 저장했습니다.");
}

/* 선택한 순서(index)의 기록을 배열에서 지우기 */
function removeRecord(index) {
    const records = getRecords();
    records.splice(index, 1);
    saveRecords(records);
    renderRecords();
    showToast("기록을 삭제했습니다.");
}

/* 화면의 모든 리스트판에 기록 카드 채워넣기 */
function renderRecords() {
    const records = getRecords();

    recordLists.forEach((recordList) => {
        recordList.innerHTML = "";

        /* 기록이 없으면 빈 메시지 띄우기 */
        if (records.length === 0) {
            recordList.innerHTML = '<p class="empty-message">아직 남긴 기록이 없습니다.</p>';
            return;
        }

        /* 미니 리스트판(compact)이면 3개만 보여주고 아니면 전부 보여주기 */
        const visibleRecords = recordList.classList.contains("compact-record-list")
            ? records.slice(0, 3)
            : records;

        /* 각각의 기록을 삭제 버튼이 달린 카드로 만들어 화면에 붙이기 */
        visibleRecords.forEach((record, index) => {
            const item = document.createElement("div");
            item.className = "record-item";
            item.innerHTML = `
                <p class="record-content">${record}</p>
                <button class="record-delete-button" type="button">삭제</button>
            `;

            /* 삭제 버튼을 누르면 해당 순서의 기록 지우기 */
            item.querySelector(".record-delete-button").addEventListener("click", () => {
                removeRecord(index);
            });

            recordList.appendChild(item);
        });
    });
}

/* 입력창에 글을 쓰거나 엔터(Shift제외)를 누르면 바로 저장하기 */
if (recordTextarea && recordButton) {
    recordTextarea.addEventListener("input", updateRecordButton);
    recordTextarea.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            saveRecord();
        }
    });
    recordButton.addEventListener("click", saveRecord);
    updateRecordButton();
}

/* 처음 페이지가 열릴 때 등록된 기록 목록 그려주기 */
renderRecords();