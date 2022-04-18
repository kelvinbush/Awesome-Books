const books = [
  {
    title: "The Design of EveryDay Things",
    author: "Don Norman",
    id: 1
  },
  {
    title: "The Most Human Human",
    author: "Brian Christian",
    id: 2
  }
]


const bookListSection = document.querySelector('#book-list')
function renderBookList(bookList) {
  bookListSection.innerHTML = bookList.map((book) => {
    return `<p class="title">${book.title}</p>
            <p>${book.author}</p>
            <button data-id=${book.id} class="remove">Remove</button>
            <hr>`
  }).join('')
}

function getBookListFromLocalStorage() {
  const bookListFromLocalStorage = localStorage.getItem('bookList')
  if (bookListFromLocalStorage) {
    return JSON.parse(bookListFromLocalStorage)
  }
  return books;
}

renderBookList(getBookListFromLocalStorage());
