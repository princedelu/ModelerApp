// Require
var express =       require('express')
    , http =        require('http')
    , passport =    require('passport')
    , path =        require('path')
	, fs = 			require('fs')
    , User =        require('./server/models/User.js');

// Variables
var app = module.exports = express();
var logFile = fs.createWriteStream(path.join(__dirname, 'log/logServer.log'), {flags: 'a'}); //use {flags: 'w'} to open in write mode
var clientDir = path.join(__dirname, 'client');


// Configuration
app.set('views', path.join(__dirname , '/client/views'));
app.set('view engine', 'jade');
app.use(express.logger({stream: logFile})); // Active le middleware de logging
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(clientDir));
app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.localStrategy);

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./server/routes/default-routes.js')(app);

app.set('port', process.env.PORT || 8080);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});