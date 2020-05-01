const login = (username, password) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/user/${username}`, false);
    xhttp.send();

    const user = JSON.parse(xhttp.responseText);

    const {
        title, 
        author, 
        publisher, 
        publish_date,
        numOfPages
    } = book;

    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('publisher').value = publisher;
    document.getElementById('publish_date').value = publish_date;
    document.getElementById('numOfPages').value = numOfPages;

    // setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}
