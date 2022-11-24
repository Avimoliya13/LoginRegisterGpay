const express = require("express");
const {createConnection} = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loginsystem",
});

// db.query("INSERT INTO users (username, password) VALUES ('avi', 'avi')" , (err, result) => {
//             console.log(err);
//         })

//         db.query("INSERT INTO users (username, password) VALUES ('avi1', 'avi1')" , (err, result) => {
//             console.log(err);
//         })

// db.query('select * from users', (err, result)=>{
//     if(err){
//         return console.log(err);
//     } else {
//         return console.log(result);
//     }
// })



app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], (err, result) => {
        console.log(err);
    })
})

app.post('/login', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ? AND password = ?", 
    [username, password], 
    (err, result) => {
        if(err){
            res.send({err: err});
        }

        if(result.length > 0){
            res.send(result);
        } else {
            res.send({ message: "Wrong username or Password combination or Empty field"});
        }
        
    })
})

app.listen(3001, () => {
    console.log("server running")
});