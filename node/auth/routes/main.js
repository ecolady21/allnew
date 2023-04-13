const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('sync-mysql');
const e = require('express');
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

function template_nodata(res) {
    res.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
        <title>Result</title>
        <meta charset="utf-8">
        <link type="text/css" rel="stylesheet" href="mystyle.css" />
    </head>
    <body>
        <h3>데이터가 존재하지 않습니다.</h3>
    </body>
    </html>
    `;
    res.end(template);
}

function template_result(result, res) {
    res.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
        <title>Result</title>
        <meta charset="utf-8">
        <link type="text/css" rel="stylesheet" href="mystyle.css" />
    </head>
    <body>
    <table border="1" style="margin:auto;">
    <thead>
        <tr><th>User ID</th><th>Password</th></tr>
    </thead>
    <tbody>
    `;
    for (var i = 0; i < result.length; i++) {
        template += `
    <tr>
        <td>${result[i]['userid']}</td>
        <td>${result[i]['passwd']}</td>
    </tr>
    `;
    }
    template += `
    </tbody>
    </table>
    </body>
    </html>
    `;
    res.end(template);
}


app.get('/hello', (req, res) => {
    res.send('Hello World~!!')
})

// request O, query X
app.get('/select', (req, res) => {
    const result = connection.query('select * from user');
    console.log(result);
    // res.send(result);
    template_result(result, res);
})

// request O, query X
app.post('/select', (req, res) => {
    const result = connection.query('select * from user');
    console.log(result);
    template_result(result, res);
})

// request O, query O
app.get('/selectQuery', (req, res) => {
    const id = req.query.id;
    if (id == "") {
        res.send('User-id를 입력하세요.')
    } else {
        const result = connection.query("select * from user where userid=?", [id]);
        console.log(result);
        if (result.length == 0) {
            template_nodata(res)
        } else {
            template_result(result, res);
        }
    }
})

// request O, query O
app.post('/selectQuery', (req, res) => {
    const id = req.body.id;
    if (id == "") {
        res.send('User-id를 입력하세요.')
    } else {
        const result = connection.query("select * from user where userid=?", [id]);
        console.log(result);
        if (result.length == 0) {
            template_nodata(res)
        } else {
            template_result(result, res);
        }
    }
})

// request O, query O
app.post('/insert', (req, res) => {
    const { id, pw } = req.body;
    if (id == "" || pw == "") {
        res.send('User-id와 Password를 입력하세요.')
    } else {
        let result = connection.query("select * from user where userid=?", [id]);
        console.log(result)
        if (result.length > 0) {
            res.send('중복Data')
        } else {
            result = connection.query("insert into user values (?, ?)", [id, pw]);
            console.log(result);
            res.redirect('/selectQuery?id=' + id);
        }
    }
})

// request O, query O
app.post('/update', (req, res) => {
    const { id, pw } = req.body;
    if (id == "" || pw == "") {
        res.send('User-id와 Password를 입력하세요.')
    } else {
        let result = connection.query("select * from user where userid=?", [id]);
        console.log(result)
        if (result.length == 0) {
            template_nodata(res)
        } else {
            const result = connection.query("update user set passwd=? where userid=?", [pw, id]);
            console.log(result);
            res.redirect('/selectQuery?id=' + id);
        }
    }
})

// request O, query O
app.post('/delete', (req, res) => {
    const id = req.body.id;
    if (id == "") {
        res.send('User-id를 입력하세요.')
    } else {
        let result = connection.query("select * from user where userid=?", [id]);
        console.log(result)
        if (result.length == 0) {
            template_nodata(res)
        } else {
            const result = connection.query("delete from user where userid=?", [id]);
            console.log(result);
            res.redirect('/select');
        }
    }
})

module.exports = app;