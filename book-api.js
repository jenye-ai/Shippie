const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 8000

let groupId = 3

let groups = [{
    "id": "1",
    "admin_name": "jennifer",
    "orders":[
        {
            "username": "anton",
            "items": [{
                "id": "1",
                "url": "a.com",
                "price": "13",
            },
            {
                "id": "2",
                "url": "b.com",
                "price": "130",
            }],
        },
        {
            "username": "anton",
            "items": [{
                "id": "1",
                "url": "a.com",
                "price": "13",
            },
            {
                "id": "2",
                "url": "b.com",
                "price": "130",
            }],
        }],

},
{
    "id": "2",
    "admin_name": "shi",
    "orders":[
        {
            "username": "anton",
            "items": [{
                "id": "1",
                "url": "a.com",
                "price": "13",
            },
            {
                "id": "2",
                "url": "b.com",
                "price": "130",
            }],
        },
        {
            "username": "anton",
            "items": [{
                "id": "1",
                "url": "a.com",
                "price": "13",
            },
            {
                "id": "2",
                "url": "b.com",
                "price": "130",
            }],
        }],

}

];


let users = [{
    "username": "jennifer",
    "password": "1234",

}, {
    "username": "shi",
    "password": "5678",

}];

var currentUser = null;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// HOME PAGE
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

// USER FUNCTIONS (REGISTRATION)
app.get('/user/:username', (req, res) => {
    // reading isbn from the URL
    const username = req.params.username;

    // searching users for the username
    for (let username of users) {
        if (users.username === username) {
            res.json(username);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('User not found');
});

app.post('/user', (req, res) => {
    const user = req.body;

    // output the user to the console for debugging
    console.log(user);
    users.push(user);

    res.send('User is added to the database');
});

app.get('/user', (req, res) => {
    res.json(users);
});

// USER FUNCTIONS (Login)
app.post('/login', (req, res) => {
    const userLogin = req.body.username
    const passLogin = req.body.password

    for (let i of users) {
        if (i.username === userLogin) {
            
            //if users.password === passLogin:
            currentUser = userLogin

            //res.sendFile(__dirname + '/book-list.html');
            res.redirect("http://localhost:8000/groups/"+ userLogin);
            return;
        }
    }

    res.send(`User Not Found; Username/Password Incorrect`);
});

app.get('/groups/:username', (req, res) => {

    const username = req.params.username;
    
    for (let i of users) {
        if (i.username === currentUser) {
            if (i.power === "admin"){
                res.sendFile(__dirname + '/group-list.html');

            }
            else {
                res.sendFile(__dirname + '/group-list.html');
            }

            return;
           
        }
    }
    
    
});

// ********** Group FUNCTIONS *************
//returns group with id
app.get('/group/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // searching books for the isbn
    for (let group of groups) {
        if (group.id === id) {
            res.json(group);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

//adds a group
app.post('/group', (req, res) => {
    const group = req.body;

    // output the book to the console for debugging
    console.log(group);
    books.push(group);

    res.send('Group is added to the database');
});


//returns list of all groups
app.get('/group', (req, res) => {
    res.json(groups);
});

// Delets a group
app.delete('/group/:id', (req, res) => {
    // reading isbn from the URL
    const id = req.params.id;

    // remove item from the groups array
    groups = groups.filter(i => {
        if (i.id !== id) {
            return true;
        }

        return false;
    });


    // sending 404 when not found something is a good practice
    res.send('Group is deleted');
});

// ********** BOOK FUNCTIONS *************
//returns list of book with isbn
app.get('/item/:id', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

// Adds a book
app.post('/book', (req, res) => {
    const book = req.body;

    // output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

//returns list of all books
app.get('/book', (req, res) => {
    res.json(books);
});

// Delets a book
app.delete('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // remove item from the books array
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }

        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('Book is deleted');
});

// Edits a book
app.post('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // add item to the book array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('Book is edited');
});
// *****************

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));