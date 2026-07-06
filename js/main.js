/* elements */
const cardGrid = document.querySelector(".card-grid");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const tagButtons = document.querySelectorAll(".tag-button");
const questionElement = document.querySelector(".question-title");

/* saved books */
function getSavedBooks() {
    return JSON.parse(localStorage.getItem("savedBooks") || "[]");
}

/* save */
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

/* copy */
// 비동기, 예외 처리문
async function copyQuote(quote) {
    try {
        await navigator.clipboard.writeText(quote);
        showToast("핵심 문장을 복사했습니다.");
    } catch {
        showToast("복사 권한을 확인해주세요.");
    }
}

/* card template */
// 카드 생성의 핵심
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

    /* toggle */
    const toggleCard = () => {
        card.classList.toggle("active");
    };

    /* keyboard */
    // 엔터와 스페이스 입력으로 상세 페이지
    card.addEventListener("click", toggleCard);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleCard();
        }
    });

    /* save button */
    card.querySelector(".save-button").addEventListener("click", (event) => {
        event.stopPropagation();
        saveBook(book.id);
    });

    /* share button */
    card.querySelector(".share-button").addEventListener("click", (event) => {
        event.stopPropagation(); 
        copyQuote(book.quote);
    });

    return card;
}

/* render */

function renderBooks(bookData) {
    if (!cardGrid) {
        return;
    }

    cardGrid.innerHTML = "";
    // 책 배열에 정보가 없으면 메시지를 띄움
    if (bookData.length === 0) {
        cardGrid.innerHTML = '<p class="empty-message">찾는 카드가 없습니다.</p>';
        return;
    }
    //책 데이터를 반복 순환하면서 책을 생성함.
    bookData.forEach((book) => {
        cardGrid.appendChild(createBookCard(book));
    });
}

/* active tag */
function setActiveTag(selectedButton) {
    tagButtons.forEach((button) => {
        button.classList.toggle("is-active", button === selectedButton); //선택된 버튼이 활성화된지 체크한다.
    });
}

/* search */
function handleSearch() {
    const searchValue = searchInput.value.trim().toLowerCase();

    if (!searchValue) {
        renderBooks(books);
        setActiveTag(null);
        return;
    }
    // 필터링된 책 기준을 문자열로 저장
    const filteredBooks = books.filter((book) => {
        const searchableText = `${book.title} ${book.author} ${book.category} ${book.quote}`.toLowerCase();
        return searchableText.includes(searchValue);
    });

    renderBooks(filteredBooks);
    setActiveTag(null);
}

/* search events */
if (searchButton && searchInput) {
    searchButton.addEventListener("click", handleSearch); //클릭
    searchInput.addEventListener("keydown", (event) => { //엔터키
        if (event.key === "Enter") {
            handleSearch(); //엔터키 입력시 검색
        }
    });
}

/* tag filter */
tagButtons.forEach((button) => { //각 버튼에 이벤트를 걸어준다.
    button.addEventListener("click", () => { 
        const selectedTag = button.textContent.trim(); //선택된 버튼의 텍스트를 가져온다.
        const filteredBooks = books.filter((book) => book.category === selectedTag); //책 배열에서 선택된 버튼의 카테고리와 일치하는 책을 필터링
        renderBooks(filteredBooks);
        setActiveTag(button);
    });
});

/* question list */
const questions = [
    "오늘 가장 오래 남은 문장은?",
    "이 책은 어떤 감정을 남겼나요?",
    "지금 나에게 필요한 문장은?",
    "책 속에서 새로 본 관점은?",
    "다시 읽고 싶은 문장이 있나요?"
];

/* random question */
if (questionElement) {
    const randomIndex = Math.floor(Math.random() * questions.length); //랜덤한 질문을 선택
    questionElement.textContent = questions[randomIndex]; //질문을 화면에 출력
}

renderBooks(books);