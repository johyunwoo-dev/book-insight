/* 책 목록이 들어갈 화면 레이아웃 판 찾아오기 */
const cardGrid = document.querySelector(".card-grid");

/* 브라우저(localStorage)에서 저장된 책 ID 목록 가져오기 */
function getSavedBooks() {
    return JSON.parse(localStorage.getItem("savedBooks") || "[]");
}

/* 선택한 책을 보관함 데이터에서 지우고 화면 새로고침하기 */
function removeBook(bookId) {
    const updatedBooks = getSavedBooks().filter((id) => id !== bookId);
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
    renderSavedBooks();
    showToast("보관함에서 삭제했습니다.");
}

/* 데이터로 삭제 버튼이 달린 보관함용 책 카드 태그 만들기 */
function createSavedBookCard(book) {
    const card = document.createElement("article");
    card.className = "book-card";
    card.tabIndex = 0;
    card.innerHTML = `
        <div class="card-image">
            <img src="${book.image}" alt="${book.title} 표지">
        </div>
        <div class="card-content">
            <div class="card-meta">
                <span class="card-tag">${book.category}</span>
                <span class="card-author">${book.author}</span>
            </div>
            <h3 class="card-title">${book.title}</h3>
            <p class="card-quote">${book.quote}</p>
            <div class="card-detail">
                <p class="card-description">${book.description}</p>
                <p class="card-insight">${book.insight}</p>
                <div class="card-actions">
                    <button class="remove-button" type="button">삭제</button>
                </div>
            </div>
        </div>
    `;

    /* 카드 열고 닫는 토글 기능 */
    const toggleCard = () => {
        card.classList.toggle("active");
    };

    /* 클릭하거나 엔터/스페이스바 누르면 카드 열고 닫기 */
    card.addEventListener("click", toggleCard);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleCard();
        }
    });

    /* 삭제 버튼 클릭 시 카드 열림 막고 보관함에서 지우기 */
    card.querySelector(".remove-button").addEventListener("click", (event) => {
        event.stopPropagation();
        removeBook(book.id);
    });

    return card;
}

/* 저장된 데이터만 골라내어 보관함 화면에 싹 그려주기 */
function renderSavedBooks() {
    const savedBookIds = getSavedBooks();
    const savedBooks = books.filter((book) => savedBookIds.includes(book.id));

    cardGrid.innerHTML = "";

    /* 저장한 책이 없으면 빈 메시지 띄우기 */
    if (savedBooks.length === 0) {
        cardGrid.innerHTML = '<p class="empty-message">아직 저장한 카드가 없습니다.</p>';
        return;
    }

    /* 저장된 책들을 하나씩 카드로 만들어 화면에 붙이기 */
    savedBooks.forEach((book) => {
        cardGrid.appendChild(createSavedBookCard(book));
    });
}

/* 처음 페이지가 열릴 때 저장된 책 목록 보여주기 */
renderSavedBooks();