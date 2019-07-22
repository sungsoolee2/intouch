const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const { ExpressOIDC } = require('@okta/oidc-middleware')
const exphbs = require("express-handlebars");
const okta = require('./okta')
const indexRouter = require('./routes/index')
const teamRouter = require('./routes/team')
const dashboardRouter = require('./routes/dashboard')
const oktaDashRouter = require('./routes/oktadash')
const landingRouter = require('./routes/landing')
const profileRouter = require('./routes/profile')
const registrationRouter = require('./routes/register')
const resetPassword = require('./routes/reset-password')
const faqRouter = require('./routes/faq')
var app = require('express')();
var http = require('http').Server(app);
var server = app.listen(3500);
var PORT = process.env.PORT || 8080;

var io = require('socket.io').listen(server);
/**************** HTML ROUTES */
require("./routes/htmlRoutes")(app);

/************************************************ DB routes */
require("./routes/parentRoutes.js")(app);

require("./routes/childRoutes.js")(app);


//data base 
const db = require("./models");

const oidc = new ExpressOIDC({
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile',

})

app.use('/', require('./routes/index'));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static('public'));
app.use(session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false,
}))

app.use(oidc.router)
app.use(okta.middleware)

app.use('/', indexRouter)
app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter)
app.use('/profile', oidc.ensureAuthenticated(), profileRouter)
app.use('/landing', landingRouter)
app.use('/oktadash', oktaDashRouter)
app.use('/team', teamRouter)
app.use('/faq', faqRouter)
app.use('/register', registrationRouter)
app.use('/reset-password', resetPassword)
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')

})

// socketio server side listener

io.on('connection', function (socket) {
  // console.log('socketio user connected on port 3500');

  //default username
  socket.username = "Anonymous"
  //listen on change_username
  socket.on('change_username', (data) => {
    socket.username = data.username
    // console.log("change username")
    
  })
  //disconnect user
  socket.on('disconnect', function () {
    // console.log('user disconnected');
  })

  //listen on new_message
  socket.on('new_message', (data) => {
    //broadcast the new message
    io.sockets.emit('new_message', {message : data.message, username : socket.username});
  })

  //listen on typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {username : socket.username})
  })

})


//SQL Database
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Sequwlize start syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  // console.log("sequlize database connected!!")
  // app.listen(PORT, function() {
  //   console.log(
  //     "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
  //     PORT,
  //     PORT
  //   );
  // });
});

module.exports = { app, oidc }