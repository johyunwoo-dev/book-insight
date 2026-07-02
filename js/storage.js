/* elements */
const cardGrid = document.querySelector(".card-grid");

/* saved books */
function getSavedBooks() {
    return JSON.parse(localStorage.getItem("savedBooks") || "[]");
}

/* remove */
function removeBook(bookId) {
    const updatedBooks = getSavedBooks().filter((id) => id !== bookId);
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
    renderSavedBooks();
    showToast("보관함에서 삭제했습니다.");
}

/* card template */
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
            </div> Flutter
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

    // toggle
    const toggleCard = () => {
        card.classList.toggle("active");
    };

    /* keyboard */
    card.addEventListener("click", toggleCard);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleCard();
        }
    });

    /* remove button */
    card.querySelector(".remove-button").addEventListener("click", (event) => {
        event.stopPropagation();
        removeBook(book.id);
    });

    return card;
}

/* render */
function renderSavedBooks() {
    const savedBookIds = getSavedBooks();
    const savedBooks = books.filter((book) => savedBookIds.includes(book.id));

    cardGrid.innerHTML = "";

    if (savedBooks.length === 0) {
        cardGrid.innerHTML = '<p class="empty-message">아직 저장한 카드가 없습니다.</p>';
        return;
    }

    savedBooks.forEach((book) => {
        cardGrid.appendChild(createSavedBookCard(book));
    });


    
}











// 렌더링 함수
renderSavedBooks();