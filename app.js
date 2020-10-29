var createError = require('http-errors');
var path = require('path');
fs = require('fs');
appRoot = path.resolve(__dirname);

const express = require('express');
const router = express.Router();

moment = require('moment');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

fplugins = require(appRoot + "/app/config/plugins.json");

SysConfig = require(appRoot + "/app/config/sys_config.json");
const DBConfig = require(appRoot + "/app/config/db_config.json");

const log4js = require('log4js');
// var logger = require('morgan');

const log4jsConfig = require(appRoot + "/app/config/log4js.json");
log4js.configure(log4jsConfig);
const accessLogger = log4js.getLogger('accessLogs');
appLogs = log4js.getLogger('appLogs');
frontApp = log4js.getLogger('frontApp');
appErrorLogs = log4js.getLogger('appErrorLogs');

const Globals = require("./app/helpers/globals.js");

// Loading Configuration Globally
_GD = new Globals();
_GD.ConfigData = SysConfig;
_GD.DBConfig = DBConfig;
_GD.DefaultData = SysConfig.default_data;
_GD.UpdateDBFormats();

// For Oracle Connections Only
const genericPool = require("generic-pool");
const oracledb = require('oracledb');

// Database Configuration and Connection
var KnexClass = require('./app/helpers/KnexClass');
ODB = new KnexClass();
ODB.CreateDbConnection();

// var favicon = require('serve-favicon');
passport = require('passport');
var flash = require('connect-flash');
require('./app/helpers/passport')(passport);

// Middleware function to get default data and logged in user details
get_data_details = function(req, res, next) {
    // if (req.session.sc && req.originalUrl != '/') {
    var default_data = JSON.parse(JSON.stringify(_GD.DefaultData));
    default_data.pageDetails = {};
    req.data_details = default_data;

    if (!req.user || (typeof req.user === 'undefined')) {
        req.data_details.user = {};
    } else {
        req.data_details.user = req.user;
    }

    next();

    // } else {
    // if (req.originalUrl == '/') {
    // var default_data = JSON.parse(JSON.stringify(_GD.DefaultData));
    // default_data.details = [];
    // req.data_details = default_data;
    // next();
    // } else {
    // res.redirect('/');
    // }
    // }
}

getRequestedPage = function(req, CALLBACK) {
    let RUrl = req.originalUrl;
    let ReqPath = (RUrl.split("/"));
    ReqPath.shift();

    return CALLBACK(ReqPath);
}

checkPrivilege = function(RequestedPath, req, CALLBACK) {

    console.log(Privileges);
    let depth = RequestedPath.length

    let pathRoles = Privileges;
    for (let di = 0; di < depth; di++) {
        let PathElement = ((RequestedPath[di]).toUpperCase());
        console.log(pathRoles[PathElement]);

        if (pathRoles[PathElement] != undefined) {
            pathRoles = pathRoles[PathElement];
        } else {
            pathRoles = [];
            break;
        }
    }

    let authCheck = false;
    if ((pathRoles.USER_ROLES != undefined) && ((pathRoles.USER_ROLES).length > 0)) {
        authCheck = ((pathRoles.USER_ROLES).includes(req.user.UROLE));
    }

    console.log(authCheck);

    return CALLBACK(true);
}

// Middleware function for user authentication
authUser = function(req, res, next) {
    // if (req.session.sc) {

    if (req.isAuthenticated()) {

        getRequestedPage(req, function(ReqPath) {

            checkPrivilege(ReqPath, req, function(Auth) {
                ODB.checkConnection(req.user.ID, function(resp) {
                    if (resp.status == false) {
                        res.send(resp.msg);
                    } else {
                        if (Auth == true) {
                            return next();
                        } else {
                            res.send({
                                status: false,
                                msg: 'Not allowed'
                            });
                        }

                    }
                });
            })

        })

    } else {
        console.log('User not logged in');
        res.redirect('/login');
    }
    // } else {
    // res.redirect('/');
    // }
}


// Router Files
var indexRouter = require('./app/controllers/index');
var contactRouter = require('./app/controllers/contacts');
var profileRouter = require('./app/controllers/profile');
var tasksRouter = require('./app/controllers/tasks');
var loginRouter = require('./app/controllers/login');

// Model Files
var ContactModel = require('./app/models/ContactModel');
var TaskModel = require('./app/models/TaskModel');
HomeModel = require('./app/models/HomeModel');
// Global Model Objects (If required)
ContactModelObj = new ContactModel();
TaskModelModelObj = new TaskModel();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(log4js.connectLogger(accessLogger, {
    level: 'info',
    // include the Express request ID in the logs
    format: (req, res, format) => format(`:remote-addr - ${req.id} - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"`)
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/class', express.static(path.join(__dirname, 'app/classes')));
app.use('/helper', express.static(path.join(__dirname, 'app/helpers/global')));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app/classes')));
app.use(express.static(path.join(__dirname, 'app/helpers/global')));

app.use(session({
    key: 'sid',
    secret: 'dh8q7whd172d12981on3d019jd',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(fileStoreOptions),
    cookie: {
        expires: false
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.user = req.user || null
    next();
})

// Assigning Routes
app.use('/', indexRouter);
app.use('/',contactRouter);
app.use('/',profileRouter);
app.use('/',tasksRouter);
app.use('/',loginRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;