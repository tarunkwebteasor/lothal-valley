var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { engine }=require('express-handlebars')
var session = require('express-session') 
var mongoose = require('./mongoose')

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login')
var usersRouter = require('./routes/users');

var app = express()



app.engine('hbs', engine({extname:'hbs',defaultLayout:'layout',layoutsDir: __dirname+'/views/layouts/'}));
app.set('views', './views');
app.set('view engine', 'hbs');

// var port = 8000;
// app.set('port', port);

const port = process.env.PORT || 80



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name : 'user_login',  
  secret : 'jdkbc87632823hbdcjsdc',
  resave : false,
  saveUninitialized : true,
  cookie : {
    maxAge : 7200000 ,
    sameSite : true ,
    secure : false
  }
}))

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/users', usersRouter);
app.use('/admin', loginRouter );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.render('error');
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

// module.exports = app;

app.listen(port,()=>{console.log(`port running at ${port}`)})

