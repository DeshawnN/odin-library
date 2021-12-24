const table = document.querySelector("table");

const ReadStatus = {
    READ: "Read",
    UNREAD: "Unread"
}

class Book {
    constructor(title, author, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages; 
        this.read = (read === 'Read') ? ReadStatus.READ : ReadStatus.UNREAD;
    }

    changeReadStatus() {
        this.read = (this.read === ReadStatus.READ) ? ReadStatus.UNREAD : ReadStatus.READ;
    }
}

class Library {
    #books = [
        new Book("War and Peace", "Leo Tolstoy", 1225, false),
        new Book("Dungeons and Dragons 5E Player Handbook", "Wizards of the Coast", 320, false),
        new Book("Harry Potter and the Deathly Hallows", "J.K. Rowling", 607, false)
    ];

    add(book) {
        this.#books.push(book);
    }

    get books() {
        return this.#books;
    }

    render() {
        const container = document.querySelector(".container");
        container.innerHTML = "";

        this.books.forEach((book, index) => {
            const div = document.createElement("div");
            div.classList.add("book");

            const entry = {
                titleDiv: createElementWithTextContent("div", book.title),
                authorDiv: createElementWithTextContent('div', book.author),
                pagesDiv: createElementWithTextContent('div', book.pages),
                readDiv: createElementWithTextContent('div', book.read),
                deleteButton: createElementWithTextContent("button", "Remove Book"),
                readStatusButton: createElementWithTextContent("button", "Change Read Status")
            };

            formatElements(entry);
            setDataAttributes(entry);

            entry.deleteButton.addEventListener('click', () => {
                this.#books.splice(index, 1);
                this.render();
            })

            entry.readStatusButton.addEventListener('click', () => {
                this.#books[index].changeReadStatus();
                this.render();
            })

            div.appendChild(entry.titleDiv);
            div.appendChild(entry.authorDiv);
            div.appendChild(entry.pagesDiv);
            div.appendChild(entry.readDiv);

            const buttons = document.createElement("div");

            buttons.appendChild(entry.deleteButton);
            buttons.appendChild(entry.readStatusButton);

            div.appendChild(buttons)

            const elements = [...div.querySelectorAll("div")];
            elements.forEach(element => {
                setEventListener(element, index);
            });

            container.appendChild(div);
        })
    }
}

const library = new Library();
library.render();

const addButton = document.querySelector("[data-add-button]");
addButton.addEventListener('click', (event) => {
    const bookInfo = getBookInfo();
    if (!validateBook(bookInfo)) {
        return;
    }
    library.add(new Book(bookInfo.title, bookInfo.author, bookInfo.pages, bookInfo.read));
    library.render();
    clearInput();
});

function validateBook(book) {
    for (const prop in book) {
        if (book[prop] == false) {
            return false;
        }
    }
    return true;
}

const inputs = document.querySelectorAll('form label > *');

function getBookInfo() {
    let [title, author, pages, read] = inputs;
    
    title = title.value
    author = author.value;
    pages = pages.value;
    read = read.value;
    
    return { 
        title, 
        author,
        pages,
        read
    }
}

function clearInput() {
    let [title, author, pages, read] = inputs;

    title.value = '';
    author.value = '';
    pages.value = 1;
    read.value = 'Unread'; 
}

function setDataAttributes(obj) {
    obj.titleDiv.setAttribute('data-title', '');
    obj.authorDiv.setAttribute('data-author', '');
    obj.pagesDiv.setAttribute('data-pages', '');
    obj.readDiv.setAttribute('data-read', '');
}

function formatElements(obj) {
    obj.authorDiv.textContent = `By ${obj.authorDiv.textContent}`;
    obj.pagesDiv.textContent = `${obj.pagesDiv.textContent} pages`;
}

function createElementWithTextContent(tagName, text) {
    const element = document.createElement(tagName);
    element.textContent = text;

    return element;
}

function changeBookProperty(property, currentValue, index) {
    const newValue = prompt(`Enter new ${property}`, currentValue);

    library.books[index][property] = (newValue != null) ? newValue : currentValue;

    library.render();
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
                console.log(author);
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