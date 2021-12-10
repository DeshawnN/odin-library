const library = [
    {author: "J.K. Rowling", title: "Harry Potter and The Sorcerer's Stone", pages: 223, read: "Haven't read it"},
    {author: "George R.R. Martin", title: "A Game of Thrones", pages: "694", read: "Haven't read it"},
];
const table = document.querySelector("table");
updateBooks();

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;

    read = read.toLowerCase();
    if (read === "yes") {
        this.read = "Read it";
    } else if (read === "no") {
        this.read = "Haven't read it";
    }
}

function addBookToLibrary() {
    book = promptForBook();
    library.push(book);
    updateBooks();
}

function promptForBook() {
    const author = prompt("Author", "George R.R. Martin");
    const title = prompt("Title", "A Game of Thrones");
    const pages = prompt("pages", 694);
    const read = prompt("Read?", "no");

    return new Book(author, title, pages, read);
}

const addButton = document.querySelector('[data-add-button]');
addButton.addEventListener('click', () => {
    addBookToLibrary();
})

function updateBooks() {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    library.forEach((book, index) => {
        const div = document.createElement("div");
        div.classList.add("book");

        const titleDiv = createElementWithTextContent("div", book.title);
        titleDiv.addEventListener('click', () => {
            changeBookProperty("title", titleDiv.textContent, index);
        })

        const authorDiv = createElementWithTextContent("div", `by ${book.author}`);
        authorDiv.addEventListener('click', () => {
            const authorName = authorDiv.textContent.slice(3);
            changeBookProperty("author", authorName, index);
        })

        const pagesDiv = createElementWithTextContent("div", `${book.pages} pages`);
        pagesDiv.addEventListener('click', () => {
            const pages = pagesDiv.textContent.split(" ")[0];
            changeBookProperty("pages", +pages, index);
        });
        const readDiv = createElementWithTextContent("div", book.read);
        readDiv.setAttribute("data-read", '');

        readDiv.addEventListener('click', () => {
            
        })

        const deleteButton = createElementWithTextContent("button", "Remove Book");
        deleteButton.addEventListener('click', () => {
            library.splice(index, 1);
            updateBooks();
        })

        const readStatusButton = createElementWithTextContent("button", "Change Read Status");
        readStatusButton.addEventListener('click', () => {
            let readStatus = library[index].read;
            library[index].read = (readStatus.toLowerCase() === "haven't read it") ? "Read it" : "Haven't read it" 
            updateBooks();
        })

        div.appendChild(titleDiv);
        div.appendChild(authorDiv);
        div.appendChild(pagesDiv);
        div.appendChild(readDiv);

        const buttons = document.createElement("div");
        buttons.appendChild(deleteButton);
        buttons.appendChild(readStatusButton);

        div.appendChild(buttons)
        container.appendChild(div);
    })
}

function createElementWithTextContent(tagName, text) {
    const element = document.createElement(tagName);
    element.textContent = text;

    return element;
}

function changeBookProperty(property, currentValue, index) {
    const newValue = prompt(`Enter new ${property}`, currentValue);

    library[index][property] = (newValue != null) ? newValue : currentValue;

    updateBooks();
} 