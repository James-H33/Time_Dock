const express    = require('express');
const router     = express.Router();
const helpers    = require('../configuration/helpers');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/userdata/:username', function(req, res, next) {
    var data = req.query.username;

    helpers.grabUsernames(data, function(err, results) {
        if(err) {
            console.log(err);
        } else if (results.error) {
            console.log(results);
            return res.send(JSON.stringify(results));
        } else {
            console.log(results);
            var returnData = {
                username: results[0].username,
                email: results[0].email
            }
            return res.send(JSON.stringify(returnData));
        }
    });
});

router.post('/userdata', function(req, res, next) {
    var data = req.body;
    helpers.insertUser(data, function(err, results) {
        if(err) console.log(err);
        res.send(data);
    });
});


module.exports = router;
