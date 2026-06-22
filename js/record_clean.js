/* elements */
const recordTextarea = document.querySelector(".record-textarea");
const recordButton = document.querySelector(".record-button");
const recordLists = document.querySelectorAll(".record-list");

/* records */
function getRecords() {
    return JSON.parse(localStorage.getItem("records") || "[]");
}

/* save records */
function saveRecords(records) {
    localStorage.setItem("records", JSON.stringify(records));
}

/* button state */
function updateRecordButton() {
    if (recordButton && recordTextarea) {
        recordButton.disabled = recordTextarea.value.trim().length === 0;
    }
}

/* add record */
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

/* remove record */
function removeRecord(index) {
    const records = getRecords();
    records.splice(index, 1);
    saveRecords(records);
    renderRecords();
    showToast("기록을 삭제했습니다.");
}

/* render */
function renderRecords() {
    const records = getRecords();

    recordLists.forEach((recordList) => {
        recordList.innerHTML = "";

        if (records.length === 0) {
            recordList.innerHTML = '<p class="empty-message">아직 남긴 기록이 없습니다.</p>';
            return;
        }

        const visibleRecords = recordList.classList.contains("compact-record-list")
            ? records.slice(0, 3)
            : records;

        visibleRecords.forEach((record, index) => {
            const item = document.createElement("div");
            item.className = "record-item";
            item.innerHTML = `
                <p class="record-content">${record}</p>
                <button class="record-delete-button" type="button">삭제</button>
            `;

            item.querySelector(".record-delete-button").addEventListener("click", () => {
                removeRecord(index);
            });

            recordList.appendChild(item);
        });
    });
}

/* events */
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

renderRecords();