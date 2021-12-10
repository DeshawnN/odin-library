let library = [

];

displayBooks();

function addBookToLibrary(book) {
    library.push(book);
}

function displayBooks() {
    const body = document.querySelector("body");
    let displayContainer = createTable();

    library.forEach(book => {
        const entry = document.createElement("tr");
        
        for (const prop in book) {
            const item = createWithTextContent("td", book[prop]);
            entry.appendChild(item);
        }

        displayContainer.appendChild(entry);
    })
    body.appendChild(displayContainer);
}

function createTable() {
    const fields = [
        "author", "name", "pages", "read"
    ]
    const table = document.createElement("table");
    const tr = document.createElement("tr");
    fields.forEach(field => {
        const item = createWithTextContent("th", field);
        tr.appendChild(item);
    });
    table.appendChild(tr);
    return table;
}

function createWithTextContent(type, text) {
    const element = document.createElement(type);
    element.textContent = text;

    return element;
}