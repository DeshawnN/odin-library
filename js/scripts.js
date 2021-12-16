const library = [];
const table = document.querySelector("table");

const ReadStatus = {
    READ: "READ",
    UNREAD: "UNREAD"
}
updateBooks();

// function Book(author, title, pages, read) {
//     this.author = author;
//     this.title = title;
//     this.pages = pages;

//     read = read.toLowerCase();
//     if (read === "yes") {
//         this.read = "Read it";
//     } else if (read === "no") {
//         this.read = "Haven't read it";
//     }
// }

// Book.prototype.changeReadStatus = function() {
//     this.read = (this.read.toLowerCase() === "read it") ? "Haven't read it" : "Read it";
// }

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages; 
        this.read = (read.toLowerCase() === "read") ? ReadStatus.READ : ReadStatus.UNREAD;
    }

    changeReadStatus() {
        this.read = (this.read === ReadStatus.READ) ? ReadStatus.UNREAD : ReadStatus.READ;
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
    const read = prompt("Read Status: (read/unread)", "read");

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
        titleDiv.setAttribute('data-title', '');

        const authorDiv = createElementWithTextContent("div", `by ${book.author}`);
        authorDiv.setAttribute('data-author', '');

        const pagesDiv = createElementWithTextContent("div", `${book.pages} pages`);
        pagesDiv.setAttribute('data-pages', '');

        const readDiv = createElementWithTextContent("div", book.read);
        readDiv.setAttribute("data-read", '');

        const deleteButton = createElementWithTextContent("button", "Remove Book");
        deleteButton.addEventListener('click', () => {
            library.splice(index, 1);
            updateBooks();
        })

        const readStatusButton = createElementWithTextContent("button", "Change Read Status");
        readStatusButton.addEventListener('click', () => {
            library[index].changeReadStatus();
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

        const elements = [...div.querySelectorAll("div")];
        elements.forEach(element => {
            setEventListener(element, index);
        });
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

function setEventListener(node, index) {
    let dataAttribute = node.getAttributeNames()
    .filter(elem => elem.startsWith("data"))[0];
    if (!dataAttribute || dataAttribute.includes("read")) return;

    dataAttribute = dataAttribute.split("-")[1];
    
    node.addEventListener('click', () => {
        switch(dataAttribute) {
            case "title":
                changeBookProperty(dataAttribute, node.textContent, index);
                break;
            case "author":
                const author = node.textContent.slice(3);
                changeBookProperty(dataAttribute, author, index);
                break;
            case "pages":
                const pages = node.textContent.split(" ")[0];
                changeBookProperty(dataAttribute, +pages, index);
                break;
            default:
                return;
        }
    })
}