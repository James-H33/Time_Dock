const express       = require('express');
const favicon       = require('serve-favicon');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const passport      = require('passport');

// Ports
const port    = process.env.PORT || 3000;
const portIP  = process.env.IP;

// Declare app var
const app = express();

// Require Routes
const indexRoutes  = require('./routes/indexRoutes');
const userRoutes   = require('./routes/userRoutes');

// Express Settings
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    'practicalsteelchicken',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    next();
});

// Use Routes
app.use('/', indexRoutes);
app.use('/', userRoutes);

app.listen(port, portIP, console.log('Server has started on port: ' + port));
