const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 8000
let ppl = [
    {
        "username": "anton",
        "password": "liu",
        "admin_groups": [
            {"group_id": 1},
            {"group_id": 4}
        ], 
        "user_groups": [
            {"group_id": 2},
            {"group_id": 3}
        ],
    },{
        "username": "shi",
        "password": "chi",
        "admin_groups": [
            {"group_id": 2}
        ], 
        "user_groups": [
            {"group_id": 1},
            {"group_id": 4}
        ],
    }
];
let groups = [{
    "group_id": 1,
    "admin_name": "anton",
    "orders":[
        {
            "username": "anton",
            "items": [{
                "id": 1,
                "url": "a.com",
                "price": 13,
            },
            {
                "id": 2,
                "url": "b.com",
                "price": 130,
            }],
        },
        {
            "username": "shi",
            "items": [{
                "id": 3,
                "url": "a.com",
                "price": 13,
            },
            {
                "id": 4,
                "url": "b.com",
                "price": 130,
            }],
        }],
    },{
    "group_id": 2,
    "admin_name": "shi",
    "orders":[
        {
            "username": "anton",
            "items": [{
                "id": 5,
                "url": "a.com",
                "price": 13,
            },
            {
                "id": 6,
                "url": "b.com",
                "price": 130,
            }],
        },
        {
            "username": "shi",
            "items": [{
                "id": 7,
                "url": "a.com",
                "price": 13,
            },
            {
                "id": 8,
                "url": "b.com",
                "price": 130,
            }],
        }],
    }
];

let push_id = 10;
let push_group_id = "";

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

//return list of books
app.get('/groups/:username/:group_id/user', (req, res) => {
    const display_username = req.params.username;
    const display_group_id = req.params.group_id;

    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.group_id === display_group_id) {
            for (let j = 0; j < group.orders.length; j++) {
                let order = group.orders[j];
                if (order.username === display_username) {
                    res.json(order.items);
                }
            }    
        }
    }
    res.send("got nothing here");
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

    //reach in to items
    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.group_id === delete_group_id) {
            for (let j = 0; j < group.orders.length; j++) {
                let order = group.orders[j];
                if (order.username === delete_username) {
                    order.items = order.items.filter(k => {
                        if (k.id !== delete_item_id) {
                            return true;
                        }
                        return false;
                    });
                }
            }    
        }
    }
    res.send("got nothing here");
});

//redirect
app.post('/user', (req, res) => {
    const name = req.body.username;
    for (let person of ppl) {
        if (person.username === name) {
            if (person.power === "admin"){
                res.redirect("http://google.com");
            }
            if (person.power === "user"){
                res.redirect("http://youtube.com");
            }
        }
    }
});

app.listen(port, () => console.log(`ppl listening on port ${port}!`));