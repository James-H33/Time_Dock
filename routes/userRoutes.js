const express    = require('express');
const router     = express.Router();
const passport   = require('passport');

router.get('/login', function(req, res, next) {
    var messages = req.flash('login_error');
    res.render('user/login', { messages: messages, hasErrors: messages.length < 0 });
});

router.post('/login', passport.authenticate('Local-Login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/register');
});

router.post('/register', passport.authenticate('Local-Register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
