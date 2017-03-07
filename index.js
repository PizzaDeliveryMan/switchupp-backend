var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello, world')
})

app.get('/yo', function (req, res) {
    res.send('YO!')
})

server = app.listen(3001, function () {
    console.log('Server running at http://localhost:' + server.address().port)   
})
