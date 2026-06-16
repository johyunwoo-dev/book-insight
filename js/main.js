/* 책 목록, 입력창, 검색 버튼 등 화면 요소 찾아오기 */
const cardGrid = document.querySelector(".card-grid");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const tagButtons = document.querySelectorAll(".tag-button");
const questionElement = document.querySelector(".question-title");

/* 저장된 책 목록 브라우저에서 불러오기 */
function getSavedBooks() {
    return JSON.parse(localStorage.getItem("savedBooks") || "[]");
}

/* 선택한 책을 브라우저 보관함에 저장하기 */
function saveBook(bookId) {
    const savedBooks = getSavedBooks();

    if (savedBooks.includes(bookId)) {
        showToast("이미 저장한 카드입니다.");
        return;
    }

    savedBooks.push(bookId);
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
    showToast("보관함에 저장했습니다.");
}

/* 핵심 문장을 클립보드에 자동으로 복사하기 */
async function copyQuote(quote) {
    try {
        await navigator.clipboard.writeText(quote);
        showToast("핵심 문장을 복사했습니다.");
    } catch {
        showToast("복사 권한을 확인해주세요.");
    }
}

/* 데이터로 책 카드 모양의 HTML 태그 만들기 */
function createBookCard(book) {
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
                    <button class="save-button" type="button">저장</button>
                    <button class="share-button" type="button">공유</button>
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

    /* 저장 버튼 클릭 시 카드 열림을 막고 저장하기 */
    card.querySelector(".save-button").addEventListener("click", (event) => {
        event.stopPropagation();
        saveBook(book.id);
    });

    /* 공유 버튼 클릭 시 카드 열림을 막고 문장 복사하기 */
    card.querySelector(".share-button").addEventListener("click", (event) => {
        event.stopPropagation();
        copyQuote(book.quote);
    });

    return card;
}

/* 화면에 책 카드 목록을 싹 그려주기 */
function renderBooks(bookData) {
    if (!cardGrid) {
        return;
    }

    cardGrid.innerHTML = "";

    /* 검색 결과가 없을 때 안내 문구 띄우기 */
    if (bookData.length === 0) {
        cardGrid.innerHTML = '<p class="empty-message">찾는 카드가 없습니다.</p>';
        return;
    }

    /* 각 책 데이터를 카드로 만들어 화면에 붙이기 */
    bookData.forEach((book) => {
        cardGrid.appendChild(createBookCard(book));
    });
}

/* 선택한 태그 버튼만 강조 표시하기 */
function setActiveTag(selectedButton) {
    tagButtons.forEach((button) => {
        button.classList.toggle("is-active", button === selectedButton);
    });
}

/* 입력한 글자로 제목, 저자, 태그, 문장 검색하기 */
function handleSearch() {
    const searchValue = searchInput.value.trim().toLowerCase();

    if (!searchValue) {
        renderBooks(books);
        setActiveTag(null);
        return;
    }

    const filteredBooks = books.filter((book) => {
        const searchableText = `${book.title} ${book.author} ${book.category} ${book.quote}`.toLowerCase();
        return searchableText.includes(searchValue);
    });

    renderBooks(filteredBooks);
    setActiveTag(null);
}

/* 검색 버튼 클릭이나 엔터키 입력 시 검색 실행하기 */
if (searchButton && searchInput) {
    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
}

/* 태그 버튼 누르면 해당 카테고리 책만 골라 보여주기 */
tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedTag = button.textContent.trim();
        const filteredBooks = books.filter((book) => book.category === selectedTag);
        renderBooks(filteredBooks);
        setActiveTag(button);
    });
});

/* 첫 화면 질문 상자에 들어갈 랜덤 문장 세트 */
const questions = [
    "오늘 가장 오래 남은 문장은?",
    "이 책은 어떤 감정을 남겼나요?",
    "지금 나에게 필요한 문장은?",
    "책 속에서 새로 본 관점은?",
    "다시 읽고 싶은 문장이 있나요?"
];

/* 페이지 열릴 때 질문 무작위로 하나 골라 띄우기 */
if (questionElement) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    questionElement.textContent = questions[randomIndex];
}

/* 맨 처음 페이지 로드 시 전체 책 목록 보여주기 */
renderBooks(books);