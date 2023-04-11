const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('sync-mysql');
const env = require('dotenv').config({ path: "../../.env" });

var connection = new mysql({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.send('Hello World~!!')
})

// request O, query X
app.get('/select', (req, res) => {
    const result = connection.query('select * from userTbl');
    console.log(result);
    res.send(result);
})

// request O, query O
app.get('/selectQuery', (req, res) => {
    const userId = req.query.userId;
    const result = connection.query("select * from userTbl where userId=?", [userId]);
    console.log(result);
    res.send(result);
})

// request O, query O
app.post('/selectQuery', (req, res) => {
    const userId = req.body.userId;
    const result = connection.query("select * from userTbl where userId=?", [userId]);
    console.log(result);
    res.send(result);
})

// request O, query O
app.post('/insert', (req, res) => {
    const { userId, userName, birthYear, addr, mobile1, mobile2, height, mdate } = req.body;
    const result = connection.query("insert into userTbl values (?, ?, ?, ?, ?, ?, ?, ?)", [userId, userName, birthYear, addr, mobile1, mobile2, height, mdate]);
    console.log(result);
    res.redirect('/selectQuery?userId=' + req.body.userId);
})

// request O, query O
app.post('/update', (req, res) => {
    const { userId, userName, birthYear, addr, mobile1, mobile2, height, mdate } = req.body;
    const result = connection.query("update userTbl set userName=?,birthYear=?, addr=?, mobile1=?, mobile2=?, height=?, mdate=? where userId=?", [userName, birthYear, addr, mobile1, mobile2, height, mdate, userId]);
    console.log(result);
    res.redirect('/selectQuery?userId=' + req.body.userId);
})

// request O, query O
app.post('/delete', (req, res) => {
    const userId = req.body.userId;
    const result = connection.query("delete from userTbl where userId=?", [userId]);
    console.log(result);
    res.redirect('/select');
})

module.exports = app;