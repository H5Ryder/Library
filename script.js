let log = console.log;

const myLibrary = [];
const modal = document.querySelector("#modal");
const openModal = document.querySelector("#open-button");
const closeModal = document.querySelector(".close-button");

log(openModal);
openModal.addEventListener("click", () => {
  modal.showModal();
});

// closeModal.addEventListener('click', ()=> {
//     modal.close();
// });

function Book(title, author, length, page) {
  this.title = title;
  this.author = author;
  this.length = length;
  this.page = page;
}

function addBookToLibrary(title, author, length, page) {
  let newBook = new Book(title, author, length, page);
  myLibrary.push(newBook);
}

function addBookToDom(myLibrary) {
  const index = myLibrary.length - 1;

  const container = document.querySelector(".container");

  let bookGrid = document.createElement("div");
  bookGrid.className = `bookGrid ${index}`;
  //container.appendChild(bookGrid);
  container.insertBefore(bookGrid, container.children[index]);

  bookGrid.innerHTML = `<p class="tag">Title</p>
    <p class="title">${myLibrary[index].title}</p>
    <p class="tag">Name</p>
    <p class="author">${myLibrary[index].author}</p>
    <div class="numbers">
      <p class="tag">Page</p>
      <p class="page">${myLibrary[index].page}</p>
      <p class="tag">Length</p>
      <p class="total">${myLibrary[index].length}</p>
    </div>
    <div class="bar">
      <div class="prog" data-index="${index}"></div>
    </div>

    <div class="buts">
      <button id="edit" data-index="${index}">Edit</button>
      <button id="del" data-index="${index}">Delete</button>
    </div>`;

  var deleteButton = document.querySelector('#del[data-index="' + index + '"]');
  var progressBar = document.querySelector('.prog[data-index="' + index + '"]');
  let percentageVal = Math.round( (myLibrary[index].page / myLibrary[index].length) * 100);
  progressBar.style.width = `${percentageVal}%`;
  progressBar.style.backgroundColor = `rgb(${255 - 255 * (percentageVal / 100)}, ${255 * (percentageVal / 100)}, 0)`;

  const editButton = document.querySelector('#edit[data-index="' + index + '"]');

  editButton.addEventListener("click", () => {
    modal.showModal();

    var title = document.getElementById("title");
    var author = document.getElementById("author");
    var total = document.getElementById("total-pages");
    var current = document.getElementById("current-page");

    title.value = myLibrary[index].title;
    author.value = myLibrary[index].author;
    total.value = myLibrary[index].length;
    current.value = myLibrary[index].page;
  });

  // Add a click event listener to each button

  deleteButton.addEventListener("click", function () {
    // Find the grandparent div and remove it
    var grandparentDiv = this.parentElement.parentElement;
    grandparentDiv.remove();

    var index = this.getAttribute("data-index");

    myLibrary.splice(index, 1);

    if (myLibrary.length == 1 || index != myLibrary.length) {
      for (let i = index + 1; i < myLibrary.length; i++) {
        // Code to be executed for each iteration
        log("Looking for data-index value " + i);

        var element = document.querySelector('[data-index="' + i + '"]');

        if (element) {
          // Matching element found
          console.log("Element found:", element);
        } else {
          // No matching element found
          console.log("No element found.");
        }

        newVal = (i - 1).toString();
        element.setAttribute("data-index", newVal);
      }
    }

    log("Deletion :" + myLibrary.length);
  });

  log("Addition :" + myLibrary.length);
}

function addElement(parent, type, className, content) {
  const element = document.createElement(`${type}`);
  element.classList.add(`${className}`);
  element.textContent = `${content}`;
  parent.appendChild(element);
}

document.getElementById("addBook").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  var frm = document.getElementById("addBook");
  // Get form input values
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var total = document.getElementById("total-pages").value;
  var page = document.getElementById("current-page").value;



  if (Number(page) > Number(total)) {
    page = total;

  }

  addBookToLibrary(title, author, total, page);
  log(myLibrary);
  modal.close();
  frm.reset();

  addBookToDom(myLibrary);
});
