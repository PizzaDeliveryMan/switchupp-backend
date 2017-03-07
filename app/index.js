var express = require('express')
var app = express()
var http = require('http'),
    fs = require('fs');

app.set('views', './views');
app.set('view engine', 'pug');

/*http.createServer(function(req, res) {
}).listen(3000);

fs.readFile('./index.html', function (err, html) {
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
});*/



app.get('/', function (req, res) {
    res.render('home', {
        title: 'Welcome',
        message: 'ミッションウァン：誰かの魂しを奪ってもらおう'
    });
})

app.get('/yo', function (req, res) {
    res.send('YO!')
})

server = app.listen(3001, function () {
    console.log('Server running at http://localhost:' + server.address().port)   
})
