class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  getTitle() {
    return this.title;
  }
  getAuthor() {
    return this.author;
  }
}

class input {
  constructor(inputId, inputLabel) {
    this.inputId = inputId;
    this.inputLabel = inputLabel;
    this.input = document.createElement("input");
    this.label = document.createElement("label");
    this.input.type = "text";
    this.input.id = this.inputId;
    this.input.style.fontSize = "1em";
    this.input.classList.add("nes-input");
    this.label.textContent = this.inputLabel;
    this.label.htmlFor = this.inputId;
    this.label.style.fontSize = "1em";
  }
  printInput() {
    return this.input;
  }
  printLabel() {
    return this.label;
  }
}

class Button {
  constructor(buttonId, buttonText, buttonClass, buttonFunction) {
    this.buttonId = buttonId;
    this.buttonText = buttonText;
    this.button = document.createElement("button");
    this.button.id = this.buttonId;
    this.button.textContent = this.buttonText;
    buttonClass.forEach((classes) => this.button.classList.add(classes));
    this.button.style.fontSize = "1em";
    this.button.style.width = "100%";
    this.button.style.height = "3em";
    this.button.style.display = "block";
    this.button.style.margin = "1em 0";
    this.button.addEventListener("click", buttonFunction);
  }
  printButton() {
    return this.button;
  }
}

class BookItem {
  constructor(book, idx) {
    this.book = book;
    this.div = document.createElement("div");
    this.h2 = document.createElement("h2");
    this.p = document.createElement("p");
    this.div.style.margin = "1em 0";
    this.delete = new Button("button", "삭제", ["nes-btn", "is-error"], bookDelete.bind(null, idx));
    this.h2.textContent = `제목 : ${this.book.getTitle()}`;
    this.p.textContent = `저자 : ${this.book.getAuthor()}`;
    this.delete.textContent = "삭제";
  }
  printBook() {
    this.div.classList.add("nes-container");
    this.div.appendChild(this.h2);
    this.div.appendChild(this.p);
    this.div.appendChild(this.delete.printButton());
    return this.div;
  }
}

const bookDelete = (idx) => {
  booksArray = booksArray.filter((book, index) => index !== idx).map((book, index) => book);
  bookContainer.innerHTML = "";
  system("책이 삭제되었습니다.");
  booksArray.forEach((book, idx) => {
    const bookItem = new BookItem(book, idx);
    bookContainer.appendChild(bookItem.printBook());
  });
};

const bookAdd = (book) => {
  booksArray = [...booksArray, book];
  bookContainer.innerHTML = "";
  booksArray.forEach((book, idx) => {
    const bookItem = new BookItem(book, idx);
    bookContainer.appendChild(bookItem.printBook());
  });
};

const error = (message) => {
  errorModal.style.display = "block";
  errorModalContent.textContent = message;
  errorModalClose.addEventListener("click", () => {
    errorModal.style.display = "none";
    errorModalContent.textContent = "";
  });
};

const system = (message) => {
  systemModal.style.display = "block";
  systemModalContent.textContent = message;
  systemModalClose.addEventListener("click", () => {
    systemModal.style.display = "none";
    systemModalContent.textContent = "";
  });
};

const mainContainer = document.querySelector("#main");
let booksArray = [];
const h1 = document.createElement("h1");
const div = document.createElement("div");
const formContainer = document.createElement("div");
const form = document.createElement("form");
const bookContainer = document.createElement("div");
const bookSubjectInput = new input("bookSubject", "책 제목");
const bookAuthorInput = new input("bookAuthor", "책 저자");
const errorModal = document.querySelector("#error-modal");
const errorModalContent = document.querySelector("#error");
const errorModalClose = document.querySelector("#error-close");
const systemModal = document.querySelector("#system-modal");
const systemModalContent = document.querySelector("#message");
const systemModalClose = document.querySelector("#system-modal-close");
const submitButton = new Button("submit", "제출", ["nes-btn", "is-primary"], function (e) {
  e.preventDefault();
  if (!bookSubjectInput.input.value || !bookAuthorInput.input.value) {
    error("빈 칸을 채워주세요.");
    return;
  }
  if (booksArray.some((book) => book.title === bookSubjectInput.input.value && book.author === bookAuthorInput.input.value)) {
    error("이미 추가된 책입니다.");
    return;
  }
  const book = new Book(bookSubjectInput.input.value, bookAuthorInput.input.value);
  bookAdd(book);
  system("책이 추가되었습니다.");
});

div.classList.add("nes-field");
div.style.width = "70em";
form.classList.add("nes-field");
h1.textContent = "서적 리스트";
h1.style.textAlign = "center";
h1.style.fontSize = "5em";
mainContainer.appendChild(div);
div.appendChild(h1);
div.appendChild(formContainer);
div.appendChild(bookContainer);
formContainer.appendChild(form);
form.appendChild(bookSubjectInput.printLabel());
form.appendChild(bookSubjectInput.printInput());
form.appendChild(bookAuthorInput.printLabel());
form.appendChild(bookAuthorInput.printInput());
form.appendChild(submitButton.printButton());
