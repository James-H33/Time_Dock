const passport       = require('passport');
const mysql          = require('mysql');
const LocalStrategy  = require('passport-local').Strategy;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'timedocker'
})

passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    var sql = 'SELECT * FROM users WHERE username = "' + username + '"';
    db.query(sql, function(err, results) {
        console.log(results);
        done(err, results[0]);
    });
})

// Register Configuration
passport.use('Local-Register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, username, password, done) {

    db.query('SELECT * FROM users WHERE username = "'+username+'"', function(err, results) {
        if (err) {
            console.log('first Error: ' + err);
            return done(err);

        } else if (results.length) {
            console.log(results);
            return done(null, false, req.flash('register_error', 'This email has already been taken'));
        } else {
            var newUser = new Object();
            newUser.username    = username;
            newUser.email       = req.body.email;
            newUser.password    = password;

            var sql = 'INSERT INTO users SET ?';

            db.query(sql, newUser, function(err, results) {
                if (err) { console.log(err);
                    return done(err);
                } else {
                    console.log('Success');
                    return done(null, newUser);
                }
            });
        }
    });
}));



// Login Configuration
passport.use('Local-Login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback

}, function(req, username, password, done) {
    db.query('SELECT * FROM users WHERE username = "'+username+'"', function(err, results) {
        if (err) {
            console.log(err);
            return done(err);
        }
        if(!results.length) {
            return done(null, false, req.flash('login_error', 'No user found.'));
        }

            // if the user is found but the password is wrong
        if (!(results[0].password == password)) {
            return done(null, false, req.flash('login_error', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        }

        // all is well, return successful user
        console.log(results[0]);
        return done(null, results[0]);
    });
}));
