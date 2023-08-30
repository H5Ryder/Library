let log = console.log

const myLibrary = [];

function Book(title, author, length, page) {
  this.title = title;
  this.author = author;
  this.length = length;
  this.page = page;

}

function addBookToLibrary(title, author, length, page) {
  let newBook = new Book(title,author,length,page);
  myLibrary.push(newBook);
}


addBookToLibrary("The book", "Harris Ryder", 10, 1);
