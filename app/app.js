const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const chai          = require('chai');
const connect       = require('connect');
const favicon       = require('serve-favicon');
const mongoose      = require('mongoose');


const cors          = require('cors');



// START ROUTES
const user          = require('./controllers/User');
const report        = require('./controllers/Report');

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
app.use(cors());
app.options('*', cors()) // include before other routes
app.use(bodyParser.json()); // for parsing application/json
//Routing
app.use('/user', user);
app.use('/report', report)

mongoose.connect('mongodb://userboi:password101@ds137281.mlab.com:37281/songstress-db', {}, (err) => {
// mongoose.connect('mongodb://localhost:27017/songstress-db', {}, (err) => {
    if (err) throw err;
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('mLab db connected!');
  // console.log('local db connected!');
});

server = app.listen(8081, function () {
    console.log('Server running at http://localhost:' + server.address().port)
})
