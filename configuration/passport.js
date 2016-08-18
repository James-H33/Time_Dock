const passport       = require('passport');
const LocalStrategy  = require('local-passport').Strategy;
const mysql          = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'timedocker'
})

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    var sql = "SELECT * FROM users WHERE id = " + id;
    db.query(sql, function(err, rows) {
        done(err, rows[0]);
    });
})

// Register Configuration
passport.use('Local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
}));
