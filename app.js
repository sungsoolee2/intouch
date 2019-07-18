require("dotenv").config();
console.log(require("dotenv").config());
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
const dashboardRouter = require('./routes/dashboard')
const profileRouter = require('./routes/profile')
const registrationRouter = require('./routes/register')
const resetPassword = require('./routes/reset-password')


const db = require("./models/user.js");
const app = express()

var PORT = process.env.PORT || 3000;

const oidc = new ExpressOIDC({
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile',
  appBaseUrl: "http://localhost:3000"
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
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

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
app.use('/register', registrationRouter)
app.use('/reset-password', resetPassword)
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// catch 404 and forward to error handler
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

module.exports = { app, oidc }