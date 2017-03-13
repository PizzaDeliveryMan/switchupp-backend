const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const pug           = require('pug');
const connect       = require('connect');
const favicon       = require('serve-favicon');
const vue           = require('vue');
const anime         = require('animejs');
const mongoose      = require('mongoose');



const index         = require('./routes/index');
const users         = require('./routes/users');
const error         = require('./routes/error');
const register      = require('./routes/register');
const test          = require('./routes/test');


const app = express();
//Set views path
app.set(__dirname, 'views');
//Set public path
app.use(express.static(path.join(__dirname, 'public')));
// Set favicon
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
//Set pug as view engine
app.set('view engine', 'pug');

//Routing
app.use('/', index);
app.use('/users', users);
app.use('/error', error);
app.use('/register', register);
app.use('/test', test);

//Test
app.get('/yo', function (req, res) {
    res.send('YO!')
})

mongoose.connect('mongodb://localhost:27017/feed-me', {}, (err) => {
    if (err) throw err
  })

server = app.listen(3001, function () {
    console.log('Server running at http://localhost:' + server.address().port)
})
