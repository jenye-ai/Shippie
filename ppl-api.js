const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let ppl = [{
    "username": "anton",
    "password": "liu",
    "power": "admin",
},
{
    "username": "jen",
    "password": "ye",
    "power": "user",
},
{
    "username": "shi",
    "password": "chi",
    "power": "user",
}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.post('/user', (req, res) => {
    const name = req.params.username;
    for (let person of ppl) {
        console.log(person);
        if (person.username === name) {
            // console.log(person.username);
            if (person.power === "admin"){
                res.send('admin');
                // res.sendFile(__dirname + '/link-child1.html');
            }
            if (person.power === "user"){
                res.send('user');
                // res.sendFile(__dirname + '/link-child2.html');
            }
        }
    }
});

app.listen(port, () => console.log(`ppl listening on port ${port}!`));