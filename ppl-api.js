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