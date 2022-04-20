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

const dateSection = document.querySelector('#date');
const dateOptions = {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
};
dateSection.innerHTML = new Date().toLocaleDateString('en-US', dateOptions);

const listLink = document.querySelector('#list');
const newLink = document.querySelector('#new');
const contactLink = document.querySelector('#contact');

const listSection = document.querySelector('#list-section');
const newSection = document.querySelector('#new-book');
const contactSection = document.querySelector('#contact-section');

listLink.addEventListener('click', () => {
  listLink.classList.add('active');
  newLink.classList.remove('active');
  contactLink.classList.remove('active');
  listSection.classList.remove('hidden');
  newSection.classList.add('hidden');
  contactSection.classList.add('hidden');
});

newLink.addEventListener('click', () => {
  listLink.classList.remove('active');
  newLink.classList.add('active');
  contactLink.classList.remove('active');
  listSection.classList.add('hidden');
  newSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
});

contactLink.addEventListener('click', () => {
  listLink.classList.remove('active');
  newLink.classList.remove('active');
  contactLink.classList.add('active');
  listSection.classList.add('hidden');
  newSection.classList.add('hidden');
  contactSection.classList.remove('hidden');
});