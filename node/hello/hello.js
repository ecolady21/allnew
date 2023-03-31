var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send("Hello Node js~!!")
})

app.listen(8000, function () {
    console.log("8000 port : Server Started~!!")
})
