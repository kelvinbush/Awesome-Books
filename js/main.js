import AwesomeBooks from './AwesomeBooks.js';

const awesomeBooks = new AwesomeBooks();
awesomeBooks.load();
if (awesomeBooks.getBooks().length < 1) {
  awesomeBooks.addBook('The Hobbit', 'J.R.R. Tolkien');
  awesomeBooks.addBook('The Lord of the Rings', 'J.R.R. Tolkien');
  awesomeBooks.addBook('The Catcher in the Rye', 'J.D. Salinger');
  awesomeBooks.addBook('The Grapes of Wrath', 'John Steinbeck');
}

const bookListSection = document.querySelector('#book-list');

function renderBookList() {
  bookListSection.innerHTML = awesomeBooks.getBooks().map((book, index) => `
        <article class="book ${index % 2 === 0 ? 'dark' : ''}">
            <div>
                <p class="title">"${book.title}" by ${book.author}</p>
            </div>
            <button data-id=${book.id} class="remove">Remove</button>
        </article>`).join('');
}

function saveBookToStorage(bookList) {
  localStorage.setItem('bookList', JSON.stringify(bookList));
}

function getBookListFromLocalStorage() {
  const bookListFromLocalStorage = localStorage.getItem('bookList');
  if (bookListFromLocalStorage) {
    return new AwesomeBooks(JSON.parse(bookListFromLocalStorage));
  }
  return awesomeBooks;
}

renderBookList();

const addBookForm = document.querySelector('#add-book');
addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = event.target.querySelector('#title').value;
  const author = event.target.querySelector('#author').value;
  awesomeBooks.addBook(title, author);
  this.reset();
  renderBookList();
});

bookListSection.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const { id } = event.target.dataset;
    awesomeBooks.deleteBook(+id);
    renderBookList();
  }
});