const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 8000

let groupId = 3

let groups = [{
    "group_id": "1",
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
            "username": "shi",
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
    "group_id": "2",
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

app.use(express.static('11pm Shippie-master'));

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
app.get('/group/:group_id', (req, res) => {
    // reading id from the URL
    const id = req.params.group_id;

    // searching books for the isbn
    for (let group of groups) {
        if (group.group_id == id) {
            res.json(group);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Group not found');
});


// Adds a group to database
app.get('/group/create/:username', (req, res) => {

    // output the book to the console for debugging
    const username = req.params.username;
    group = {}

    group["group_id"] = groupId ;
    groupId = groupId +1;
    group["admin_name"] = username;

    group["orders"] = [];
    
    console.log(group);
    groups.push(group);

    //res.send('Group is added to the database');

    res.redirect("http://localhost:8000/groups/"+ username);


});

//returns list of all groups
app.get('/group', (req, res) => {
    res.json(groups);
});

// Deletes a group
app.delete('/group/:group_id', (req, res) => {
    // reading isbn from the URL
    const id = req.params.group_id;

    // remove item from the groups array
    groups = groups.filter(i => {
        if (i.group_id != id) {
            return true;
        }

        return false;
    });


    // sending 404 when not found something is a good practice
    res.send('Group is deleted');
});

// ********** CONNECTING GROUP TO ORDERS FUNCTIONS *************
app.get('/groups/:username/:group_id/user', (req, res) => {

    res.sendFile(__dirname + '/book-list.html');
});


let push_id = 10;
let push_group_id = "";

//return list of items
app.get('/groups/:displayusername/:displaygroupid', (req, res) => {
    const display_username = req.params.displayusername;
    const display_group_id = req.params.displaygroupid;

    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.group_id == display_group_id) {
            for (let j = 0; j < group.orders.length; j++) {
                let order = group.orders[j];
                if (order.username == display_username) {
                    res.json(order.items);
                }
            }    
        }
    }
});



//add
app.post('/groups/:username/:group_id/user/add_item', (req, res) => {
    const push_url = req.body.url;
    const push_price = req.body.price;

    const push_username = req.params.username;
    const push_group_id = req.params.group_id;

    const push_item = {
        "id": push_id,
        "url": push_url,
        "price": push_price,
    }

    push_id ++;

    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.group_id === push_group_id) {
            for (let j = 0; j < group.orders.length; j++) {
                let order = group.orders[j];
                if (order.username === push_username) {
                    order.items.push(push_item);
                    console.log(order);
                }
            }    
        }
    }

    // res.send('Item is added');
})

//delete
app.delete('/groups/:username/:group_id/user/:item_id', (req, res) => {
    // reading id from URL
    const delete_username = req.params.username;
    const delete_group_id = req.params.group_id;
    const delete_item_id = req.params.item_id;

    //reach in groups
    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        console.log("group");
        if (group.group_id == delete_group_id) {
            for (let j = 0; j < group.orders.length; j++) {
                let order = group.orders[j];
                console.log("order");
                if (order.username == delete_username) {
                    console.log(order);
                    for (let k = 0; k < order.items.length; k++) {
                        let item = order.items[k];
                        console.log(item);
                        if (item.id == delete_item_id) {
                            order.items.splice(k, 1);
                            console.log(order.items);
                            res.redirect('back');
                        }
                    }
                }
            }    
        }
    }
    
});
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));