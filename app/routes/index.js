var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('home', {
        title: 'Feed Me',
        message: 'ミッションウァン：誰かの魂しを奪ってもらおう'
    });
});

module.exports = router;
