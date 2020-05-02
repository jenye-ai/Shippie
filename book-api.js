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
            "username": "jennifer",
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

// ********** USER LOGIN FUNCTIONS *************
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

// ********** CONNECTING USER LOGIN TO GROUPS FUNCTIONS *************
//Directs user to their corresponding list of groups page
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

// ********** GROUP FUNCTIONS *************
//returns information of group based on id (used for debugging)
app.get('/group/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // searching books for the isbn
    for (let group of groups) {
        if (group.id == id) {
            res.json(group);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});


// Adds a group to database
app.get('/group/create/:username', (req, res) => {

    // output the book to the console for debugging
    const username = req.params.username;
    group = {}

    group["id"] = groupId ;
    groupId = groupId +1;
    group["admin_name"] = username;

    group["orders"] = [];
    
    console.log(group);
    groups.push(group);

    //res.send('Group is added to the database');

    res.redirect("http://localhost:8000/groups/"+ username);


});
/*
//adds a group
app.post('/group', (req, res) => {
    const group = req.body;

    // output the book to the console for debugging
    console.log(group);
    books.push(group);

    res.send('Group is added to the database');
});
*/

//returns list of all groups
app.get('/group', (req, res) => {
    res.json(groups);
});

// Deletes a group
app.delete('/group/:id', (req, res) => {
    // reading isbn from the URL
    const id = req.params.id;

    // remove item from the groups array
    groups = groups.filter(i => {
        if (i.id != id) {
            return true;
        }

        return false;
    });


    // sending 404 when not found something is a good practice
    res.send('Group is deleted');
});

// ********** CONNECTING GROUP TO ORDERS FUNCTIONS *************
app.get('/groups/:username/:id/user', (req, res) => {

    res.sendFile(__dirname + '/book-list.html');
});


/*app.get('/groups/:username/:id/admin', (req, res) => {


});
*/

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));