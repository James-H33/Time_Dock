const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'timedocker'
});

module.exports = {
    grabUsernames: function(username, cb) {
        var sql = 'SELECT username, email FROM users WHERE username = "' + username + '"';

        db.query(sql, function(err, results) {
            if(err) {
                console.log(err);
            } else if(Object.keys(results).length === 0) {
                return cb(null, { error: 'No user found!' });
            }
            console.log(results.length);
            return cb(null, results);
        });
    },
    insertUser: function(newUser, cb) {
        console.log(newUser);

        var sql = 'SELECT username FROM users WHERE username = "'+newUser.username+'"';
        db.query(sql, function(err, results) {
            if(err) {
                console.log(err);
            } else if(Object.keys(results).length > 0) {
                return cb(null, { error : 'Username already in use.' });
            } else {

                var sql = 'INSERT INTO users SET ?';
                db.query(sql, newUser, function(err, results) {
                    if(err) {
                        return cb(err, null);
                    }
                    console.log(results);
                    return cb(null, results);
                });
            }
        });
    }
}









//
