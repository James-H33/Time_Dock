const express    = require('express');
const router     = express.Router();

router.get('/login', function(req, res, next) {
    res.render('user/login');
});

router.get('/register', function(req, res, next) {
    res.render('user/regsiter');
});

router.get('/logout', function(req, res, next) {
    res.render('index');
});

module.exports = router;
