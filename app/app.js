const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pug = require('pug');

const index = require('./routes/index');
const users = require('./routes/users');
const error = require('./routes/error');

const app = express();
//app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
//Set views path
app.set(__dirname, 'views');
//Set public path
app.use(express.static(path.join(__dirname, 'public')));
//Set pug as view engine
app.set('view engine', 'pug');

app.use('/', index);
app.use('/users', users);
app.use('/error', error);

//Test
app.get('/yo', function (req, res) {
    res.send('YO!')
})

server = app.listen(3001, function () {
    console.log('Server running at http://localhost:' + server.address().port)
})
