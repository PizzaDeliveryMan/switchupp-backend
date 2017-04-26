const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const chai          = require('chai');
const connect       = require('connect');
const favicon       = require('serve-favicon');
const mongoose      = require('mongoose');

const cors = require('cors');



// START ROUTES
const user          = require('./controllers/user');
const report        = require('./controllers/report')
//END ROUTES

const app = express();
//Set views path
// app.set(__dirname, 'views');
//Set public path
// app.use(express.static(path.join(__dirname, 'public')));
// Set favicon
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
//Set pug as view engine
// app.set('view engine', 'pug

app.use(bodyParser.json()); // for parsing application/json
app.use(cors());
//Routing
app.use('/user', user);
app.use('/report', report)

mongoose.connect('mongodb://localhost:27017/feed-me', {}, (err) => {
    if (err) throw err;
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server = app.listen(3001, function () {
    console.log('Server running at http://localhost:' + server.address().port)
})
