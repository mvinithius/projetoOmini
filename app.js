var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// declaração da session
const session = require('express-session');

// declaração do método override
const methodOverride = require('method-override')

//middleware userIsAuthenticated
const userIsAuthenticated = require('./src/middlewares/userIsAuthenticated');

var indexRouter = require('./src/routes/index.routes');
var usersRouter = require('./src/routes/users.routes');
var privateRouter = require('./src/routes/userPrivate.routes');
var adminRouter = require('./src/routes/admin.routes');


var app = express();

//views path setup
app.set('views', './src/views');

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

//permite o uso do fomulário multipart/form-data
app.use(express.urlencoded({ extended: false }));

// Define o uso de sessões
app.use(session({
    secret: 'projetoOmnihouseDH2022',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000
    }
}));

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

//uso do método override: PUT, DELETE
app.use(methodOverride('_method'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// Utiliza o middleware userIsAuthenticated para verificar se o usuário está logado
// O middleware será executado para todas as rotas abaixo
app.use(userIsAuthenticated);

app.use('/users', privateRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
